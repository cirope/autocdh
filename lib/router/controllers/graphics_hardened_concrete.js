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
  var filter    = Graphics.castQuery(query)
  var strength  = Strengths.findOne(filter.strengthId)

  if (Graphics.filterSamples(filter).count()) {
    while (filter.start.isBefore(filter.end)) {
      var dayEnd    = filter.start.clone().endOf('day')
      var samples   = Graphics.filterSamples(_.extend(_.clone(filter), { end: dayEnd }), { fields: { _id: 1 } })
      var sampleIds = _.pluck(samples.fetch(), '_id')
      var cracks    = Cracks.find({ days: { $gte: 28 }, stress: { $ne: null }, error: { $lte: 15 }, sampleId: { $in: sampleIds } })
      var serie     = -1
      var bySample  = {}
      var i         = 0

      cracks.forEach(function (crack) {
        var sibling = bySample[crack.sampleId]

        if (sibling) {
          if (! series[serie = i])
            series[serie] = {
              data:      [],
              className: 'ct-series ct-series-a only-points'
            }

          series[serie].data[labels.length] = {
            meta:  crack.designation,
            value: Math.round((crack.stress + sibling.stress) * 100) / 200
          }

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
    var meanSerie     = { className: 'ct-series ct-series-c only-line', data: [] }
    var meanData      = series[0]
    var start         = null
    var end           = null
    var startPosition = 0

    if (meanData) {
      for (var i = 0, l = meanData.data.length; i < l; i++) {
        var stress = meanData.data[i] && meanData.data[i].value

        if (stress) {
          meanTmp.push({ value: stress, position: i })

          // look into the same position on other series
          for (var j = 1, k = series.length; j < k; j++)
            if (stress = series[j].data[i] && series[j].data[i].value)
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

        lastPosition = mean.position
        lastValue    = mean.value
      }

      for (var i = meanSerie.data.length, l = labels.length; i < l; i++)
        meanSerie.data.push(lastValue)
    }

    series.push(meanSerie)

    if (strength && strength.individualCriteria && strength.averageCriteria) {
      var upperLimit  = Graphics.arrayOf(strength.individualCriteria, labels.length)
      var lowerLimit  = Graphics.arrayOf(strength.averageCriteria, labels.length)

      series.unshift({
        data:      upperLimit,
        className: 'ct-series ct-series-m only-line dotted-a'
      })

      series.unshift({
        data:      lowerLimit,
        className: 'ct-series ct-series-e only-line dotted-b'
      })
    }
  }

  return {
    samples:  Graphics.filterSamples(Graphics.castQuery(query)),
    strength: strength,
    labels:   labels,
    series:   series,
    filter:   {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    }
  }
}

GraphicHardenedConcreteResistanceController = RouteController.extend({
  data: function () { return hardenedConcreteData.call(this) }
})
