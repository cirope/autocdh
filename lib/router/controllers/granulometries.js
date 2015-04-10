var subs        = new SubsManager
var processTest = function (granulometry) {
  var result              = []
  var chartData           = []
  var retained            = []
  var retainedAccumulated = 0
  var passedPercentage    = 0
  var passedAccumulated   = 0
  var sampleWeight        = _.reduce(granulometry.test, function (memo, t) {
    return memo + (granulometry.type === 'sand' ? t.grossWeight - t.netWeight : t.netWeight)
  }, 0)
  var correction          = Math.round(sampleWeight * granulometry.thin.percentage / 100)
  var retainedTotal       = sampleWeight + correction

  granulometry.test.forEach(function (test, i) {
    var testRetained = granulometry.type === 'sand' ? test.grossWeight - test.netWeight : test.netWeight
    var last         = i === 7 && granulometry.type === 'sand' || i === 10

    retainedAccumulated += testRetained

    var passed = sampleWeight - retainedAccumulated

    passedPercentage   = last ? 0 : Math.round((retainedTotal - retainedAccumulated) / retainedTotal * 100)
    passedAccumulated += passedPercentage

    chartData.push(passedPercentage)

    retainedAccumulatedPercentage = 100 - passedPercentage

    retained.push(retainedAccumulatedPercentage)

    result.push(_.extend(test, {
      retained:                      testRetained,
      retainedAccumulated:           retainedAccumulated,
      passed:                        passed,
      passedPercentage:              passedPercentage,
      passedAccumulated:             passedAccumulated,
      retainedAccumulatedPercentage: retainedAccumulatedPercentage
    }))
  })

  return {
    test:          result,
    chartData:     chartData,
    retained:      retained,
    sampleWeight:  sampleWeight,
    correction:    correction,
    retainedTotal: retainedTotal
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
    var granulometry    = Granulometries.findOne(this.params._id)
    var extraAttributes = processTest(granulometry)

    return _.extend(granulometry, extraAttributes)
  }
})
