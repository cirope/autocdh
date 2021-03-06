var addAverageToSeries = function (average, series, labels) {
  if (_.isNumber(average)) {
    var length = labels.length

    series.unshift({
      data:      Graphics.arrayOf(average, length),
      className: 'ct-series ct-series-m transparent-points dotted-a'
    })
  }
}

var addSettlementLimitToSeries = function (settlementId, series, labels) {
  var settlement = settlementId && Settlements.findOne(settlementId)

  if (settlement && series.length) {
    var length = labels.length

    if (settlement.upperLimit)
      series.unshift({
        data:      Graphics.arrayOf(settlement.upperLimit, length),
        className: 'ct-series ct-series-b transparent-points dotted-a'
      })

    if (settlement.lowerLimit)
      series.unshift({
        data:      Graphics.arrayOf(settlement.lowerLimit, length),
        className: 'ct-series ct-series-b transparent-points dotted-b'
      })
  }
}

var addVolumetricWeightLimitsToSeries = function (series, labels, realValues, theoreticalValues) {
  var sum = function (memo, value) { return memo + value }

  if (realValues.length) {
    var average = _.reduce(realValues, sum) / realValues.length

    series.unshift({
      data:      Graphics.arrayOf(average, labels.length),
      className: 'ct-series ct-series-a transparent-points dotted-a'
    })
  }

  if (theoreticalValues.length) {
    var average = _.reduce(theoreticalValues, sum) / theoreticalValues.length

    series.unshift({
      data:      Graphics.arrayOf(average, labels.length),
      className: 'ct-series ct-series-f transparent-points dotted-a'
    })
  }
}

var freshConcreteDataFor = function (type) {
  var series = []
  var labels = []
  var values = []
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
        if (type === 'settlement' && ! assay.extended || type === 'temperature' || (type === 'air' && assay[type])) {
          if (! series[serie = i])
            series[serie] = { className: 'ct-series ct-series-a only-points', data: [] }

          series[serie].data[labels.length] = {
            meta:  Samples.findOne(assay.sampleId).name,
            value: assay[type]
          }

          values.push(assay[type])
        }
      })

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
    }
  }

  var mean = Graphics.mean(values)

  if (type === 'settlement') {
    addSettlementLimitToSeries(filter.settlementId, series, labels)
    addAverageToSeries(mean, series, labels)
  }

  return {
    samples:   Graphics.filterSamples(Graphics.castQuery(query)),
    labels:    labels,
    series:    series,
    values:    values,
    mean:      mean,
    deviation: Graphics.deviation(values),
    filter:    _.extend(filter, {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    })
  }
}

GraphicFreshConcreteConsistencyController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(freshConcreteDataFor.bind(self, 'settlement'))
  }
})

GraphicFreshConcreteSettlementController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(freshConcreteDataFor.bind(self, 'settlement'))
  }
})

GraphicFreshConcreteAirController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(freshConcreteDataFor.bind(self, 'air'))
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
        filter:  _.extend(filter, {
          start: moment(query.start).toDate(),
          end:   moment(query.end).toDate()
        })
      }
    })
  }
})

GraphicFreshConcreteVolumetricWeightController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(function () {
      var series            = []
      var labels            = []
      var references        = []
      var query             = _.defaults(self.params.query, {
        start: moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
        end:   moment().startOf('day').format('YYYY-MM-DD')
      })
      var filter            = Graphics.castQuery(query)
      var realValues        = []
      var theoreticalValues = []

      if (Graphics.filterSamples(filter).count()) {
        while (filter.start.isBefore(filter.end)) {
          var dayEnd    = filter.start.clone().endOf('day')
          var samples   = Graphics.filterSamples(_.extend(_.clone(filter), { end: dayEnd }), { fields: { _id: 1 } })
          var concretes = Concretes.find({ sampleId: { $in: _.pluck(samples.fetch(), '_id') } })
          var serie     = -1

          concretes.forEach(function (concrete, i) {
            var sample           = Samples.findOne(concrete.sampleId)
            var assay            = Assays.findOne({ sampleId: sample._id, weight: { $gt: 0 } })
            var humidity         = Humidities.findOne({ sampleId: sample._id })
            var sum              = function (memo, x) { return memo + x.amount }
            var concretesWeight  = _.reduce(concrete.concretes, sum, 0)
            var sandsWeight      = _.reduce(concrete.sands, sum, 0)
            var gravelsWeight    = _.reduce(concrete.gravels, sum, 0)
            var volumetricWeight = concrete.water +
              (concrete.reducer || 0) +
              concretesWeight +
              sandsWeight +
              gravelsWeight +
              (humidity && (humidity.ice || 0) + (humidity.additionalWater || 0))

            if (assay && ! series[serie = i])
              series[serie] = { className: 'ct-series ct-series-a only-points', data: [] }

            if (assay) {
              series[serie].data[labels.length] = {
                meta:  sample.name,
                value: assay.weight
              }

              realValues.push(assay.weight)
            }

            if (! references[serie = i])
              references[serie] = { className: 'ct-series ct-series-f only-points', data: [] }

            references[serie].data[labels.length] = {
              meta:  sample.name,
              value: volumetricWeight
            }

            theoreticalValues.push(volumetricWeight)
          })

          labels.push(filter.start.format('L'))

          filter.start.add(1, 'day')
        }
      }

      addVolumetricWeightLimitsToSeries(series, labels, realValues, theoreticalValues)

      return {
        samples: Graphics.filterSamples(Graphics.castQuery(query)),
        labels:  labels,
        series:  _.union(references, series),
        filter:  _.extend(filter, {
          start: moment(query.start).toDate(),
          end:   moment(query.end).toDate()
        })
      }
    })
  }
})
