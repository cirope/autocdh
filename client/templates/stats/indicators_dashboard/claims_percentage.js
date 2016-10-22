var dispatchedSettings = null
var claimsSettings     = null
var claimSettings      = null

var claimFor = function (month) {
  var dispatched = _.findWhere(dispatchedSettings, { month: +month })
  var withClaims = _.findWhere(claimsSettings, { month: +month })

  if (dispatched && dispatched.value && withClaims && _.isNumber(withClaims.value))
    return withClaims.value / dispatched.value * 100
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsIndicatorsDashboardClaimsPercentage.onCreated(function () {
  var qaSettings = this.data.settings && this.data.settings.qa
  var indicators = qaSettings && qaSettings.indicators
  var volumes    = qaSettings && qaSettings.dispatchedVolume
  var claims     = qaSettings && qaSettings.claimsVolume

  if (! volumes || ! claims || ! indicators) return

  dispatchedSettings = volumes
  claimsSettings     = claims
  claimSettings      = indicators.claimsPercentageMin && indicators.claimsPercentageMax && {
    min: indicators.claimsPercentageMin,
    max: indicators.claimsPercentageMax
  }
})

Template.statsIndicatorsDashboardClaimsPercentage.onDestroyed(function () {
  dispatchedSettings = null
  claimsSettings     = null
  claimSettings      = null
})

Template.statsIndicatorsDashboardClaimsPercentage.helpers({
  claimsPercentage: function () {
    if (claimSettings) {
      var month    = moment(this.value, 'YYYYMM')
      var claim    = claimFor(month.format('YYYYMM'))
      var cssClass = 'success'

      if (claim < claimSettings.min) cssClass = 'danger'
      if (claim > claimSettings.max) cssClass = 'warning'

      return {
        value: claim.toFixed(1) + '%',
        class: claim !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
