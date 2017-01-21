var tripsSettings          = null
var affectedTrucksSettings = null
var tripsByMixerSettings   = null

var tripsByMixerFor = function (month) {
  var trips          = _.findWhere(tripsSettings, { month: +month })
  var affectedTrucks = _.findWhere(affectedTrucksSettings, { month: +month })

  if (trips && trips.value && affectedTrucks && affectedTrucks.value)
    return trips.value / affectedTrucks.value
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardTripsByMixer.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var trips              = productionSettings && productionSettings.trips
  var affected           = productionSettings && productionSettings.affectedTrucks

  if (! trips || ! affected || ! indicators) return

  tripsSettings          = trips
  affectedTrucksSettings = affected
  tripsByMixerSettings   = indicators.tripsByMixerMin && indicators.tripsByMixerMax && {
    min: indicators.tripsByMixerMin,
    max: indicators.tripsByMixerMax
  }
})

Template.statsProductionIndicatorsDashboardTripsByMixer.onDestroyed(function () {
  tripsSettings          = null
  affectedTrucksSettings = null
  tripsByMixerSettings   = null
})

Template.statsProductionIndicatorsDashboardTripsByMixer.helpers({
  tripsByMixer: function () {
    if (tripsByMixerSettings) {
      var month        = moment(this.value, 'YYYYMM')
      var tripsByMixer = tripsByMixerFor(month.format('YYYYMM'))
      var rounded      = Math.round(tripsByMixer * 10) / 10
      var cssClass     = 'warning'

      if (rounded < tripsByMixerSettings.min) cssClass = 'danger'
      if (rounded > tripsByMixerSettings.max) cssClass = 'success'

      return {
        value: _.isNumber(tripsByMixer) ? tripsByMixer.toFixed(1) : tripsByMixer,
        class: tripsByMixer !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
