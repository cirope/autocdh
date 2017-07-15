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
      var rounded    = Math.round(nonconform * 10) / 10
      var cssClass   = 'success'

      if (rounded > nonconformSettings.min) cssClass = 'warning'
      if (rounded > nonconformSettings.max) cssClass = 'danger'

      return {
        value: _.isNumber(nonconform) ? nonconform.toFixed(1) + '%' : nonconform,
        class: nonconform !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
