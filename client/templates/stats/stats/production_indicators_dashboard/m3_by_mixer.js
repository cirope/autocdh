var dispatchedSettings     = null
var affectedTrucksSettings = null
var m3ByMixerSettings      = null

var m3ByMixerFor = function (month) {
  var dispatched     = _.findWhere(dispatchedSettings, { month: +month })
  var affectedTrucks = _.findWhere(affectedTrucksSettings, { month: +month })

  if (dispatched && dispatched.value && affectedTrucks && affectedTrucks.value)
    return dispatched.value / affectedTrucks.value
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardM3ByMixer.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var volumes            = this.data.settings && this.data.settings.qa && this.data.settings.qa.dispatchedVolume
  var affected           = productionSettings && productionSettings.affectedTrucks

  if (! volumes || ! affected || ! indicators) return

  dispatchedSettings     = volumes
  affectedTrucksSettings = affected
  m3ByMixerSettings      = indicators.m3ByMixerMin && indicators.m3ByMixerMax && {
    min: indicators.m3ByMixerMin,
    max: indicators.m3ByMixerMax
  }
})

Template.statsProductionIndicatorsDashboardM3ByMixer.onDestroyed(function () {
  dispatchedSettings     = null
  affectedTrucksSettings = null
  m3ByMixerSettings      = null
})

Template.statsProductionIndicatorsDashboardM3ByMixer.helpers({
  m3ByMixer: function () {
    if (m3ByMixerSettings) {
      var month     = moment(this.value, 'YYYYMM')
      var m3ByMixer = m3ByMixerFor(month.format('YYYYMM'))
      var rounded   = Math.round(m3ByMixer * 10) / 10
      var cssClass  = 'warning'

      if (rounded < m3ByMixerSettings.min) cssClass = 'danger'
      if (rounded > m3ByMixerSettings.max) cssClass = 'success'

      return {
        value: _.isNumber(m3ByMixer) ? m3ByMixer.toFixed(1) : m3ByMixer,
        class: m3ByMixer !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
