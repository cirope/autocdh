var volumesSettings = null
var volumeSettings  = null
var samples         = null

var volumeFor = function (month) {
  var dispatched = _.findWhere(volumesSettings, { month: +month })
  var _samples   = samples[month]

  if (dispatched && dispatched.value && _samples && _samples.length)
    return Math.round(dispatched.value / _samples.length)
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsIndicatorsDashboardVolume.onCreated(function () {
  var qaSettings = this.data.settings && this.data.settings.qa
  var indicators = qaSettings && qaSettings.indicators
  var volumes    = qaSettings && qaSettings.dispatchedVolume

  if (! volumes || ! indicators) return

  samples         = this.data.samples
  volumesSettings = volumes
  volumeSettings  = indicators.volumeMin && indicators.volumeMax && {
    min: indicators.volumeMin,
    max: indicators.volumeMax
  }
})

Template.statsIndicatorsDashboardVolume.onDestroyed(function () {
  samples        = null
  volumeSettings = null
})

Template.statsIndicatorsDashboardVolume.helpers({
  volume: function () {
    if (volumeSettings) {
      var month    = moment(this.value, 'YYYYMM')
      var volume   = volumeFor(month.format('YYYYMM'))
      var cssClass = 'success'

      if (volume < volumeSettings.min) cssClass = 'danger'
      if (volume > volumeSettings.max) cssClass = 'warning'

      return {
        value: volume,
        class: volume !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
