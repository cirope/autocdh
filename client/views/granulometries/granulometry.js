var type                = null
var retainedTotal       = 0
var thinPercentage      = 0
var correction          = 0
var sampleWeight        = 0
var passedPercentage    = 0
var passedAccumulated   = 0
var retainedAccumulated = 0
var retained            = []
var chartData           = []

var initVars = function () {
  var self            = this

  type                = self.type
  chartData           = []
  retained            = []
  retainedAccumulated = 0
  passedPercentage    = 0
  passedAccumulated   = 0
  sampleWeight        = _.reduce(self.test, function (memo, t) {
    return memo + (type === 'sand' ? t.grossWeight - t.netWeight : t.netWeight)
  }, 0)
  correction          = Math.round(sampleWeight * thinPercentage / 100)
  retainedTotal       = sampleWeight + correction
}

Template.granulometry.rendered = function () {
  var ctx  = document.getElementById('chart').getContext('2d')
  var data = {
    labels: _.pluck(this.data.test, 'sieve').slice(0, -1).reverse(),
    datasets: [
      {
        fillColor:   'rgba(147,197,75,0)',
        strokeColor: 'rgba(147,197,75,1)',
        data:        chartData.slice(0, -1).reverse()
      }
    ]
  }

  new Chart(ctx).Line(data, {
    responsive:   true,
    pointDot:     false,
    showTooltips: false,
    bezierCurve:  false
  })
}

Template.granulometry.helpers({
  type: function () {
    return TAPi18n.__('granulometry_type_' + this.type)
  },

  sand: function () {
    return (this.type || type) === 'sand'
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

    thinPercentage = netAfter > 0 ? (netBefore - netAfter) / netBefore * 100 : 0

    return thinPercentage.toFixed(1)
  },

  test: function () {
    initVars.apply(this)

    return this.test
  },

  retained: function () {
    return type === 'sand' ? this.grossWeight - this.netWeight : this.netWeight
  },

  retainedAccumulated: function () {
    var retained = type === 'sand' ? this.grossWeight - this.netWeight : this.netWeight

    retainedAccumulated += retained

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

    chartData.push(passedPercentage)

    return passedPercentage
  },

  retainedAccumulatedPercentage: function () {
    retained.push(100 - passedPercentage)

    return 100 - passedPercentage
  },

  fineness: function () {
    var fineness = 0

    if (type === 'sand') {
      fineness = _.reduce(retained.slice(0, -1), function (memo, n) { return memo + n }, 0) / 100
    } else {
      var indexes = [0, 3, 5, 7, 8, 9]

      fineness = _.reduce(indexes, function (memo, i) {
        return memo + retained[i]
      }, 400 - 3 * thinPercentage) / 100
    }

    return fineness.toFixed(2)
  }
})
