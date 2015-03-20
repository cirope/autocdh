// For _target_ lines see: http://jsbin.com/dajole/3/edit?css,js,output

var filterSamples = function (filter, options) {
  var selector = {
    date: {
      $gte: filter.start.toDate(), $lte: filter.end.toDate()
    }
  }

  if (filter.strengthId  || filter.aggregateId || filter.settlementId) {
    var concretes = Concretes.find(
      _.pick(filter, 'strengthId', 'aggregateId', 'settlementId'),
      { fields: { sampleId: 1 } }
    )

    selector._id = { $in: concretes.map(function (c) { return c.sampleId }) }
  }

  return Samples.find(selector, options)
}

var castQuery = function (query) {
  return _.extend(_.clone(query), {
    start: moment(query.start),
    end:   moment(query.end)
  })
}

var freshConcreteDataFor = function (type) {
  var series = []
  var labels = []
  var query  = _.defaults(this.params.query, {
    start: moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
    end:   moment().startOf('day').format('YYYY-MM-DD')
  })
  var filter = castQuery(query)

  if (filterSamples(filter).count()) {
    while (filter.start.isBefore(filter.end)) {
      var dayEnd  = filter.start.clone().endOf('day')
      var samples = filterSamples(_.extend(_.clone(filter), { end: dayEnd }), { fields: { _id: 1 } })
      var assays  = Assays.find({ sampleId: { $in: _.pluck(samples.fetch(), '_id') } })
      var serie   = -1
      var noValue = -1000000

      assays.forEach(function (assay, i) {
        if (! series[serie = i])
          series[serie] = { className: 'ct-series ct-series-a', data: [] }

        series[serie].data[labels.length] = assay[type]
      })

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
    }

    for (var i = 0, l = series.length; i < l; i++)
      for (var j = 0, k = labels.length; j < k; j++)
        series[i].data[j] = series[i].data[j] || noValue
  }

  return {
    samples: filterSamples(castQuery(query)),
    labels:  labels,
    series:  series,
    filter:  {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    }
  }
}

var defaultStrength = function () {
  var strength = Strengths.findOne({}, { sort: { createdAt: 1 }, fields: { _id: 1 } })

  return strength && strength._id
}

var hardenedConcreteData = function () {
  var series    = []
  var labels    = []
  var query     = _.defaults(this.params.query, {
    strengthId: defaultStrength(),
    start:      moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
    end:        moment().startOf('day').format('YYYY-MM-DD')
  })
  var filter    = castQuery(query)
  var strength  = Strengths.findOne(filter.strengthId)

  if (filterSamples(filter).count()) {
    while (filter.start.isBefore(filter.end)) {
      var dayEnd    = filter.start.clone().endOf('day')
      var samples   = filterSamples(_.extend(_.clone(filter), { end: dayEnd }), { fields: { _id: 1 } })
      var sampleIds = samples.map(function (s) { return s._id })
      var cracks    = Cracks.find({ days: 28, stress: { $ne: null }, sampleId: { $in: sampleIds } })
      var serie     = -1
      var noValue   = -1
      var bySample  = {}
      var i         = 0

      cracks.forEach(function (crack) {
        var sibling = bySample[crack.sampleId]

        if (sibling) {
          if (! series[serie = i])
            series[serie] = { className: 'ct-series ct-series-a only-points', data: [] }

          series[serie].data[labels.length] = (crack.stress + sibling.stress) / 2

          i++
        } else {
          bySample[crack.sampleId] = crack
        }
      })

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
    }

    var meanTmp       = []
    var means         = []
    var meanSerie     = { className: 'ct-series ct-series-b only-line', data: [] }
    var meanData      = series[0]
    var start         = null
    var end           = null
    var startPosition = 0

    if (meanData) {
      for (var i = 0, l = meanData.data.length; i < l; i++) {
        var stress = meanData.data[i]

        if (stress) {
          meanTmp.push({ value: stress, position: i })

          // look into the same position on other series
          for (var j = 1, k = series.length; j < k; j++)
            if (stress = series[j].data[i])
              meanTmp.push({ value: stress, position: i })
        }
      }

      for (var i = 0, l = meanTmp.length; i < l; i++) {
        var stresses = meanTmp.slice(i, i + 3)

        if (stresses.length === 3) {
          var average =  _.reduce(stresses, function (sum, n) { return sum + n.value }, 0) / 3

          means.push({ value: average, position: stresses[2].position })
        }
      }

      var lastPosition = 0
      var lastValue    = means[0] ? means[0].value : 0

      for (var i = 0, l = means.length; i < l; i ++) {
        var mean      = means[i]
        var increment = (mean.value - lastValue) / (mean.position - lastPosition)

        for (var j = lastPosition, k = mean.position; j < k; j++) {
          lastValue += increment

          meanSerie.data.push(lastValue)
        }

        lastPosition = mean.position + 1
        lastValue    = mean.value
      }

      for (var i = meanSerie.data.length, l = labels.length; i < l; i++)
        meanSerie.data.push(lastValue)
    }

    for (var i = 0, l = series.length; i < l; i++)
      for (var j = 0, k = labels.length; j < k; j++)
        series[i].data[j] = series[i].data[j] || noValue

    series.push(meanSerie)
  }

  return {
    samples:  filterSamples(castQuery(query)),
    strength: strength,
    labels:   labels,
    series:   series,
    filter:   {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    }
  }
}

GraphicFreshConcreteConsistencyController = RouteController.extend({
  data: function () { return freshConcreteDataFor.call(this, 'settlement') }
})

GraphicFreshConcreteTemperatureController = RouteController.extend({
  data: function () { return freshConcreteDataFor.call(this, 'temperature') }
})

GraphicHardenedConcreteResistanceController = RouteController.extend({
  data: function () { return hardenedConcreteData.call(this) }
})
