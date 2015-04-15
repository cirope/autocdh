var addSettlementLimitToSeries = function (settlementId, series) {
  var settlement = settlementId && Settlements.findOne(settlementId)

  if (settlement && series.length) {
    var length = series[0].data.length

    if (settlement.upperLimit)
      series.unshift({
        data:      Graphics.arrayOf(settlement.upperLimit, length),
        className: 'ct-series ct-series-b only-line dotted-a'
      })

    if (settlement.lowerLimit)
      series.unshift({
        data:      Graphics.arrayOf(settlement.lowerLimit, length),
        className: 'ct-series ct-series-b only-line dotted-b'
      })
  }
}

var freshConcreteDataFor = function (type) {
  var series = []
  var labels = []
  var query  = _.defaults(this.params.query, {
    start: moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
    end:   moment().startOf('day').format('YYYY-MM-DD')
  })
  var filter = Graphics.castQuery(query)

  if (Graphics.filterSamples(filter).count()) {
    while (filter.start.isBefore(filter.end)) {
      var dayEnd  = filter.start.clone().endOf('day')
      var samples = Graphics.filterSamples(_.extend(_.clone(filter), { end: dayEnd }), { fields: { _id: 1 } })
      var assays  = Assays.find({ sampleId: { $in: _.pluck(samples.fetch(), '_id') } })
      var serie   = -1
      var noValue = -1000000

      assays.forEach(function (assay, i) {
        if (! series[serie = i])
          series[serie] = { className: 'ct-series ct-series-a only-points', data: [] }

        series[serie].data[labels.length] = assay[type]
      })

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
    }

    for (var i = 0, l = series.length; i < l; i++)
      for (var j = 0, k = labels.length; j < k; j++)
        series[i].data[j] = series[i].data[j] || noValue
  }

  if (type === 'settlement') addSettlementLimitToSeries(filter.settlementId, series)

  return {
    samples: Graphics.filterSamples(Graphics.castQuery(query)),
    labels:  labels,
    series:  series,
    filter:  {
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

GraphicFreshConcreteTemperatureComparisonController = RouteController.extend({
  data: function () {
    var series  = []
    var labels  = []
    var temps   = {}
    var query   = _.defaults(this.params.query, {
      start: moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
      end:   moment().startOf('day').format('YYYY-MM-DD')
    })
    var filter  = Graphics.castQuery(query)
    var samples = Graphics.filterSamples(filter)
    var assays  = Assays.find({ sampleId: { $in: _.pluck(samples.fetch(), '_id') } })
    var noValue = -100

    assays.forEach(function (assay) {
      var sample  = Samples.findOne(assay.sampleId)

      if (_.isNumber(sample.temperature)) {
        var closest = (Math.round(sample.temperature * 2) / 2).toFixed(1)

        if (! temps[closest]) temps[closest] = []

        temps[closest].push(assay.temperature)
      }
    })

    var sortedkeys  = _.sortBy(_.keys(temps), function (key) { return +key })
    var min         = + _.first(sortedkeys)
    var max         = + _.last(sortedkeys)
    var sortedTemps = {}

    for (var i = min, l = max; i <= l; i += 0.5)
      sortedTemps[i.toFixed(1)] = temps[i.toFixed(1)]

    _.each(sortedTemps, function (values, label) {
      if (values)
        values.forEach(function (value, i) {
          if (! series[serie = i])
            series[serie] = { className: 'ct-series ct-series-a only-points', data: [] }

          series[serie].data[labels.length] = value
        })

      labels.push(label)
    })

    for (var i = 0, l = series.length; i < l; i++)
      for (var j = 0, k = labels.length; j < k; j++)
        series[i].data[j] = _.isNumber(series[i].data[j]) ? series[i].data[j] : noValue

    var minValue  = 100
    var xPosition = 1

    // TODO: search for trendline and do a series with it
    _.each(sortedTemps, function (values, label) {
      if (values)
        values.forEach(function (value) {
          if (value < minValue) minValue = value
        })
    })


    return {
      samples: Graphics.filterSamples(Graphics.castQuery(query)),
      labels:  labels,
      series:  series,
      low:     minValue - 1,
      filter:  {
        start: moment(query.start).toDate(),
        end:   moment(query.end).toDate()
      }
    }
  }
})
