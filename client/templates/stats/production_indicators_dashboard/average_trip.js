var dispatchedSettings  = null
var tripsSettings       = null
var averageTripSettings = null

var averageTripFor = function (month) {
  var dispatched = _.findWhere(dispatchedSettings, { month: +month })
  var trips      = _.findWhere(tripsSettings, { month: +month })

  if (dispatched && dispatched.value && trips && trips.value)
    return dispatched.value / trips.value
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardAverageTrip.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var volumes            = this.data.settings && this.data.settings.qa && this.data.settings.qa.dispatchedVolume
  var trips              = productionSettings && productionSettings.trips

  if (! volumes || ! trips || ! indicators) return

  dispatchedSettings  = volumes
  tripsSettings       = trips
  averageTripSettings = indicators.averageTripMin && indicators.averageTripMax && {
    min: indicators.averageTripMin,
    max: indicators.averageTripMax
  }
})

Template.statsProductionIndicatorsDashboardAverageTrip.onDestroyed(function () {
  dispatchedSettings  = null
  tripsSettings       = null
  averageTripSettings = null
})

Template.statsProductionIndicatorsDashboardAverageTrip.helpers({
  averageTrip: function () {
    if (averageTripSettings) {
      var month       = moment(this.value, 'YYYYMM')
      var averageTrip = averageTripFor(month.format('YYYYMM'))
      var rounded     = Math.round(averageTrip * 10) / 10
      var cssClass    = 'warning'

      if (rounded < averageTripSettings.min) cssClass = 'danger'
      if (rounded > averageTripSettings.max) cssClass = 'success'

      return {
        value: _.isNumber(averageTrip) ? averageTrip.toFixed(1) : averageTrip,
        class: averageTrip !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
