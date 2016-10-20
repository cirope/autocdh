var deviationCoefficientSettings = null

Template.statsIndicatorsDashboardDeviationCoefficient.onCreated(function () {
  var qaSettings  = this.data.settings && this.data.settings.qa
  var indicators  = qaSettings && qaSettings.indicators
  var percentages = qaSettings && qaSettings.dispatchedPercentages

  if (! percentages || ! indicators) return

  deviationCoefficientSettings = indicators.deviationCoefficientMin && indicators.deviationCoefficientMax && {
    min: indicators.deviationCoefficientMin,
    max: indicators.deviationCoefficientMax
  }

  StatsDeviation.strengths            = this.data.strengths
  StatsDeviation.deviationPercentages = percentages
})

Template.statsIndicatorsDashboardDeviationCoefficient.onDestroyed(function () {
  deviationCoefficientSettings        = null
  StatsDeviation.strengths            = null
  StatsDeviation.deviationPercentages = null
})

Template.statsIndicatorsDashboardDeviationCoefficient.helpers({
  deviationCoefficient: function () {
    if (deviationCoefficientSettings) {
      var month                = moment(this.value, 'YYYYMM')
      var deviationCoefficient = StatsDeviation.deviationCoefficientFor(month)
      var cssClass             = 'success'

      if (deviationCoefficient < deviationCoefficientSettings.min) cssClass = 'danger'
      if (deviationCoefficient > deviationCoefficientSettings.max) cssClass = 'warning'

      return {
        value: deviationCoefficient,
        class: deviationCoefficient !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
