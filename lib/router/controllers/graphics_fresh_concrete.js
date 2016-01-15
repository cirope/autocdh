var addSettlementLimitToSeries = function (settlementId, series, labels) {
  var settlement = settlementId && Settlements.findOne(settlementId)

  if (settlement && series.length) {
    var length = labels.length

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

var addVolumetricWeightLimitToSeries = function (filter, series, labels) {
  if (filter.strengthId && series.length) {
    var formulas = Formulas.find(_.pick(filter, 'strengthId', 'aggregateId', 'settlementId'))

    if (formulas.count()) {
      var length         = labels.length
      var theoreticalSum = _.reduce(formulas.fetch(), function (memo, formula) {
        var sum              = function (memo, x) { return memo + x.amount }
        var concretesWeight  = _.reduce(formula.concretes, sum, 0)
        var sandsWeight      = _.reduce(formula.sands, sum, 0)
        var gravelsWeight    = _.reduce(formula.gravels, sum, 0)

        return memo + formula.water + (formula.reducer || 0) + concretesWeight + sandsWeight + gravelsWeight
      }, 0)

      series.unshift({
        data:      Graphics.arrayOf(theoreticalSum / formulas.count(), length),
        className: 'ct-series ct-series-b only-line dotted-a'
      })
    }
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

      assays.forEach(function (assay, i) {
        if (type === 'settlement' && ! assay.extended || type === 'temperature') {
          if (! series[serie = i])
            series[serie] = { className: 'ct-series ct-series-a only-points', data: [] }

          series[serie].data[labels.length] = {
            meta:  Samples.findOne(assay.sampleId).name,
            value: assay[type]
          }
        }
      })

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
    }
  }

  if (type === 'settlement')
    addSettlementLimitToSeries(filter.settlementId, series, labels)

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
  data: function () {
    var self = this

    return Tracker.nonreactive(freshConcreteDataFor.bind(self, 'settlement'))
  }
})

GraphicFreshConcreteTemperatureController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(freshConcreteDataFor.bind(self, 'temperature'))
  }
})

GraphicFreshConcreteTemperatureComparisonController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(function () {
      var series  = []
      var labels  = []
      var temps   = {}
      var query   = _.defaults(self.params.query, {
        start: moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
        end:   moment().startOf('day').format('YYYY-MM-DD')
      })
      var filter  = Graphics.castQuery(query)
      var samples = Graphics.filterSamples(filter)
      var assays  = Assays.find({ sampleId: { $in: _.pluck(samples.fetch(), '_id') } })

      assays.forEach(function (assay) {
        var sample   = Samples.findOne(assay.sampleId)
        var humidity = Humidities.findOne({ sampleId: sample._id })
        var addAssay = _.isNumber(sample.temperature) && _.isNumber(assay.temperature)

        if (addAssay && humidity && ! humidity.hasIce) {
          var closest = (Math.round(sample.temperature * 2) / 2).toFixed(1)

          if (! temps[closest]) temps[closest] = []

          temps[closest].push({
            meta:  Samples.findOne(assay.sampleId).name,
            value: assay.temperature
          })
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
              series[serie] = {
                data:      [],
                className: 'ct-series ct-series-a only-points'
              }

            series[serie].data[labels.length] = value
          })

        labels.push(label)
      })

      var minValue  = 100

      // TODO: search for trendline and do a series with it
      _.each(sortedTemps, function (values, label) {
        if (values)
          values.forEach(function (value) {
            if (value.value < minValue) minValue = value.value
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
    })
  }
})

GraphicFreshConcreteVolumetricWeightController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(function () {
      var series = []
      var labels = []
      var query  = _.defaults(self.params.query, {
        start: moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
        end:   moment().startOf('day').format('YYYY-MM-DD')
      })
      var filter = Graphics.castQuery(query)

      if (Graphics.filterSamples(filter).count()) {
        while (filter.start.isBefore(filter.end)) {
          var dayEnd    = filter.start.clone().endOf('day')
          var samples   = Graphics.filterSamples(_.extend(_.clone(filter), { end: dayEnd }), { fields: { _id: 1 } })
          var concretes = Concretes.find({ sampleId: { $in: _.pluck(samples.fetch(), '_id') } })
          var serie     = -1

          concretes.forEach(function (concrete, i) {
            var sum              = function (memo, x) { return memo + x.amount }
            var concretesWeight  = _.reduce(concrete.concretes, sum, 0)
            var sandsWeight      = _.reduce(concrete.sands, sum, 0)
            var gravelsWeight    = _.reduce(concrete.gravels, sum, 0)
            var volumetricWeight = concrete.water + (concrete.reducer || 0) + concretesWeight + sandsWeight + gravelsWeight

            if (! series[serie = i])
              series[serie] = { className: 'ct-series ct-series-a only-points', data: [] }

            series[serie].data[labels.length] = {
              meta:  Samples.findOne(concrete.sampleId).name,
              value: volumetricWeight
            }
          })

          labels.push(filter.start.format('L'))

          filter.start.add(1, 'day')
        }
      }

      addVolumetricWeightLimitToSeries(filter, series, labels)

      return {
        samples: Graphics.filterSamples(Graphics.castQuery(query)),
        labels:  labels,
        series:  series,
        filter:  {
          start: moment(query.start).toDate(),
          end:   moment(query.end).toDate()
        }
      }
    })
  }
})
