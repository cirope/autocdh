var retainedAccumulated = 0
var retainedTotal       = 0
var thinPercentage      = 0
var correction          = 0
var sampleWeight        = 0
var passedPercentage    = 0
var passedAccumulated   = 0

var initVars            = function () {
  retainedAccumulated = 0
  passedPercentage    = 0
  passedAccumulated   = 0
  sampleWeight        = _.reduce(this.test, function (memo, t) {
    return memo + t.grossWeight - t.netWeight
  }, 0)
  correction          = Math.round(sampleWeight * thinPercentage / 100)
  retainedTotal       = sampleWeight + correction
}

Template.granulometry.helpers({
  type: function () {
    return TAPi18n.__('granulometry_type_' + this.type)
  },

  responsible: function () {
    return Responsible.findOne(this.responsibleId).name
  },

  plant: function () {
    return Plants.findOne(this.plantId).name
  },

  dried: function () {
    return TAPi18n.__(this.dried ? 'yes' : 'no')
  },

  washed: function () {
    return TAPi18n.__(this.washed ? 'yes' : 'no')
  },

  humidityPercentage: function () {
    var netWet = this.humidity.massOfWetAggregate - this.humidity.massOfContainer
    var netDry = this.humidity.massOfDryAggregate - this.humidity.massOfContainer

    return netDry > 0 ? ((netWet - netDry) / netDry * 100).toFixed(1) : 0
  },

  thinPercentage: function () {
    var netBefore = this.thin.massBeforeWash - this.thin.massOfContainer
    var netAfter  = this.thin.massAfterWash  - this.thin.massOfContainer

    thinPercentage = netAfter > 0 ? (netBefore - netAfter) / netAfter * 100 : 0

    return thinPercentage.toFixed(1)
  },

  test: function () {
    initVars.apply(this)

    return this.test
  },

  retained: function () {
    return this.grossWeight - this.netWeight
  },

  retainedAccumulated: function () {
    retainedAccumulated += this.grossWeight - this.netWeight

    return retainedAccumulated
  },

  correction: function () {
    return correction
  },

  retainedTotal: function () {
    return retainedTotal
  },

  sampleWeight: function () {
    return sampleWeight
  },

  passed: function () {
    return retainedTotal - retainedAccumulated
  },

  passedPercentage: function () {
    passedPercentage   = Math.round((retainedTotal - retainedAccumulated) / retainedTotal * 100)
    passedAccumulated += passedPercentage

    return passedPercentage
  },

  retainedAccumulatedPercentage: function () {
    return 100 - passedPercentage
  },

  fineness: function () {
    return (passedAccumulated / 100).toFixed(2)
  }
})
