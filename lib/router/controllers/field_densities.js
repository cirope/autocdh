var dateRange = function (date) {
  var range = date.split('|')

  return {
    $gte: moment(_.first(range)).startOf('day').toDate(),
    $lte: moment(_.last(range)).endOf('day').toDate()
  }
}

var castQuery = function (query) {
  var selector = {}

  if (query.name) selector.name = new RegExp('.*' + query.name + '.*', 'gi')
  if (query.date) selector.date = dateRange(query.date)

  if (+query.fineness)
    selector.fineness = {
      $gt: +query.fineness - 0.1,
      $lt: +query.fineness + 0.1
    }

  if (query.material) {
    var regexp    = new RegExp('.*' + query.material + '.*', 'gi')
    var material  = Materials.findOne()
    var materials = _.union(material.sands, material.gravels)
    var materials = _.filter(materials, function (m) {
      return regexp.test(m.name)
    })

    selector.materialId = { $in: _.pluck(materials, '_id') }
  }

  if (query.plant) {
    var plants = Plants.find({ name: new RegExp('.*' + query.plant + '.*', 'gi') })

    selector.plantId = { $in: _.pluck(plants.fetch(), '_id') }
  }

  if (query.provider) {
    var providers = Providers.find({ name: new RegExp('.*' + query.provider + '.*', 'gi') })

    selector.providerId = { $in: _.pluck(providers.fetch(), '_id') }
  }

  return selector
}

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
  var correction          = granulometry.thin ? Math.round(sampleWeight * granulometry.thin.percentage / 100) : 0
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

FieldDensitiesController = RouteController.extend({
  increment: 30,

  fieldDensitiesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { date: -1 }, limit: this.fieldDensitiesLimit() }
  },

  subscriptions: function () {
    this.granulometriesSub = subs.subscribe('fieldDensitiesLimited', this.findOptions())
  },

  granulometries: function (query) {
    return FieldDensities.find(_.isEmpty(query) ? {} : castQuery(query), this.findOptions())
  },

  data: function () {
    var hasMore  = this.granulometries(this.params.query).count() === this.fieldDensitiesLimit()
    var nextPath = this.route.path({ limit: this.fieldDensitiesLimit() + this.increment })

    return {
      granulometries: this.granulometries(this.params.query),
      ready:          this.granulometriesSub.ready,
      nextPath:       hasMore ? nextPath : null,
      hasQuery:       ! _.isEmpty(this.params.query)
    }
  }
})

FieldDensityEditController = RouteController.extend({
  data: function () {
    return FieldDensities.findOne(this.params._id)
  }
})

FieldDensityController = RouteController.extend({
  data: function () {
    var granulometry    = FieldDensities.findOne(this.params._id)
    var extraAttributes = granulometry && processTest(granulometry)

    return granulometry && _.extend(granulometry, extraAttributes)
  }
})
