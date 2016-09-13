var deviationSettings  = null
var cracks             = null

var tenPercentCriteria = function (stresses) {
  var removeCount    = Math.round(stresses.length * 0.1)
  var sumFunction    = function (memo, s) { return memo + s.stress }
  var mean           = _.reduce(stresses, sumFunction, 0) / stresses.length
  var sortedStresses = _.sortBy(stresses, function (s) { return Math.abs(s.stress - mean) })

  return _.initial(sortedStresses, removeCount)
}

Template.statsIndicatorsDashboardDeviation.onCreated(function () {
  var indicators = this.data.settings && this.data.settings.qa && this.data.settings.qa.indicators

  if (! indicators) return

  cracks            = this.data.cracks
  deviationSettings = indicators.deviationMin && indicators.deviationMax && {
    min: indicators.deviationMin,
    max: indicators.deviationMax
  }

  console.log(cracks)
})

Template.statsIndicatorsDashboardDeviation.onDestroyed(function () {
  cracks            = null
  deviationSettings = null
})

Template.statsIndicatorsDashboardDeviation.helpers({
  deviation: function (context) {
    if (deviationSettings) {
      var month = moment(this.value, 'YYYYMM')

      _.each(cracks, function (_cracks, strengthName) {
        var stresses = []

        stresses = tenPercentCriteria(stresses)
      })

    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
