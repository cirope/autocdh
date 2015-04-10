var subs                  = new SubsManager
var humidityPercentageFor = function (granulometry) {
  var humidity = granulometry.humidity
  var netWet   = humidity && humidity.massOfWetAggregate - humidity.massOfContainer
  var netDry   = humidity && humidity.massOfDryAggregate - humidity.massOfContainer

  return netDry > 0 ? ((netWet - netDry) / netDry * 100).toFixed(1) : 0
}

var thinPercentageFor = function (granulometry) {
  var thin           = granulometry.thin
  var netBefore      = thin && thin.massBeforeWash - thin.massOfContainer
  var netAfter       = thin && thin.massAfterWash  - thin.massOfContainer
  var thinPercentage = netAfter > 0 ? (netBefore - netAfter) / netBefore * 100 : 0

  return thinPercentage.toFixed(1)
}

var processTest = function (granulometry) {
  var result              = []
  var chartData           = []
  var retained            = []
  var retainedAccumulated = 0
  var passedPercentage    = 0
  var passedAccumulated   = 0
  var fineness            = 0
  var thinPercentage      = thinPercentageFor(granulometry)
  var humidityPercentage  = humidityPercentageFor(granulometry)
  var sampleWeight        = _.reduce(granulometry.test, function (memo, t) {
    return memo + (granulometry.type === 'sand' ? t.grossWeight - t.netWeight : t.netWeight)
  }, 0)
  var correction          = Math.round(sampleWeight * thinPercentage / 100)

  granulometry.test.forEach(function (test) {
    var testRetained = granulometry.type === 'sand' ? test.grossWeight - test.netWeight : test.netWeight

    retainedAccumulated += testRetained

    var passed = sampleWeight - retainedAccumulated

    passedPercentage = Math.round((sampleWeight - retainedAccumulated) / sampleWeight * 100)
    passedAccumulated += passedPercentage

    chartData.push(passedPercentage)
    retained.push(100 - passedPercentage)

    retainedAccumulatedPercentage = 100 - passedPercentage

    result.push(_.extend(test, {
      retained:                      testRetained,
      retainedAccumulated:           retainedAccumulated,
      passed:                        passed,
      passedPercentage:              passedPercentage,
      passedAccumulated:             passedAccumulated,
      retainedAccumulatedPercentage: retainedAccumulatedPercentage
    }))
  })

  if (granulometry.type === 'sand') {
    fineness = _.reduce(retained.slice(0, -1), function (memo, n) { return memo + n }, 0) / 100
  } else {
    var indexes = [0, 3, 5, 7, 8, 9]

    fineness = _.reduce(indexes, function (memo, i) {
      return memo + retained[i]
    }, 300 - 3 * thinPercentage) / 100
  }

  return {
    test:               result,
    chartData:          chartData,
    retained:           retained,
    sampleWeight:       sampleWeight,
    thinPercentage:     thinPercentage,
    humidityPercentage: humidityPercentage,
    correction:         correction,
    retainedTotal:      sampleWeight + correction,
    fineness:           fineness
  }
}

GranulometriesController = RouteController.extend({
  increment: 10,

  granulometriesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { date: -1 }, limit: this.granulometriesLimit() }
  },

  subscriptions: function () {
    this.granulometriesSub = subs.subscribe('granulometriesLimited', this.findOptions())
  },

  granulometries: function () {
    return Granulometries.find({}, this.findOptions())
  },

  data: function () {
    var hasMore  = this.granulometries().count() === this.granulometriesLimit()
    var nextPath = this.route.path({ limit: this.granulometriesLimit() + this.increment })

    return {
      granulometries: this.granulometries(),
      ready:          this.granulometriesSub.ready,
      nextPath:       hasMore ? nextPath : null
    }
  }
})

GranulometryEditController = RouteController.extend({
  data: function () {
    return Granulometries.findOne(this.params._id)
  }
})

GranulometryController = RouteController.extend({
  data: function () {
    var granulometry        = Granulometries.findOne(this.params._id)
    var dynamicAttributes   = processTest(granulometry)

    return _.extend(granulometry, dynamicAttributes)
  }
})

