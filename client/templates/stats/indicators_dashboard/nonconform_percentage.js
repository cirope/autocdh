var dispatchedSettings  = null
var nonconformsSettings = null
var nonconformSettings  = null

var nonconformFor = function (month) {
  var dispatched     = _.findWhere(dispatchedSettings, { month: +month })
  var withNonconform = _.findWhere(nonconformsSettings, { month: +month })

  if (dispatched && dispatched.value && withNonconform && _.isNumber(withNonconform.value))
    return withNonconform.value / dispatched.value * 100
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsIndicatorsDashboardNonconformPercentage.onCreated(function () {
  var qaSettings = this.data.settings && this.data.settings.qa
  var indicators = qaSettings && qaSettings.indicators
  var volumes    = qaSettings && qaSettings.dispatchedVolume
  var nonconform = qaSettings && qaSettings.nonconformVolume

  if (! volumes || ! nonconform || ! indicators) return

  dispatchedSettings  = volumes
  nonconformsSettings = nonconform
  nonconformSettings  = indicators.nonconformPercentageMin && indicators.nonconformPercentageMax && {
    min: indicators.nonconformPercentageMin,
    max: indicators.nonconformPercentageMax
  }
})

Template.statsIndicatorsDashboardNonconformPercentage.onDestroyed(function () {
  dispatchedSettings  = null
  nonconformsSettings = null
  nonconformSettings  = null
})

Template.statsIndicatorsDashboardNonconformPercentage.helpers({
  nonconformPercentage: function () {
    if (nonconformSettings) {
      var month      = moment(this.value, 'YYYYMM')
      var nonconform = nonconformFor(month.format('YYYYMM'))
      var cssClass   = 'success'

      if (nonconform) {
        if (nonconform < nonconformSettings.min) cssClass = 'danger'
        if (nonconform > nonconformSettings.max) cssClass = 'warning'
      }

      return {
        value: nonconform.toFixed(1) + '%',
        class: nonconform !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
