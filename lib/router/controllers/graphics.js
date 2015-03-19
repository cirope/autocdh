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

var dataFor = function (type) {
  var length     = 0
  var series     = []
  var labels     = []
  var query      = _.defaults(this.params.query, {
    start: moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
    end:   moment().startOf('day').format('YYYY-MM-DD')
  })
  var filter      = castQuery(query)

  if (filterSamples(filter).count()) {
    while (filter.start.isBefore(filter.end)) {
      var dayEnd  = filter.start.clone().endOf('day')
      var samples = filterSamples(_.extend(_.clone(filter), { end: dayEnd }), { fields: { _id: 1 } })
      var assays  = Assays.find({ sampleId: { $in: _.pluck(samples.fetch(), '_id') } })
      var serie   = -1
      var noValue = -1000000

      assays.forEach(function (assay, i) {
        if (! series[serie = i]) series[serie] = []

        series[serie][length] = assay[type]
      })

      for (var i = serie + 1, l = series.length; i < l; i++)
        series[i][length] = noValue

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
      length++
    }

    for (var i = 0; i < series.length; i++)
      for (var j = 0; j < series[i].length; j++)
        if (! series[i][j]) series[i][j] = noValue
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

GraphicFreshConcreteConsistencyController = RouteController.extend({
  data: function () { return dataFor.call(this, 'settlement') }
})

GraphicFreshConcreteTemperatureController = RouteController.extend({
  data: function () { return dataFor.call(this, 'temperature') }
})
