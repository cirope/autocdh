var addSettlementLimitSeries = function (series) {
  if (series.length) {
    var length      = series[0].data.length

    series.unshift({
      className: 'ct-series ct-series-b only-line dotted-a',
      data: Graphics.arrayOf(10, length)
    })

    series.unshift({
      className: 'ct-series ct-series-b only-line dotted-b',
      data: Graphics.arrayOf(5, length)
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

  if (type === 'settlement') addSettlementLimitSeries(series)

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
