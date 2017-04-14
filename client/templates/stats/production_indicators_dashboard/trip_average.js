var averageCycleTripSettings  = null
var tripAverageSettings       = null

var tripAverageFor = function (month) {
  var averageCycleTrip = _.findWhere(averageCycleTripSettings, { month: +month })

  if (averageCycleTrip && averageCycleTrip.value)
    return averageCycleTrip.value
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardTripAverage.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var averageCycleTrip   = productionSettings && productionSettings.averageCycleTrip

  if (! averageCycleTrip || ! indicators) return

  averageCycleTripSettings = averageCycleTrip
  tripAverageSettings      = indicators.tripAverageMin && indicators.tripAverageMax && {
    min: indicators.tripAverageMin,
    max: indicators.tripAverageMax
  }
})

Template.statsProductionIndicatorsDashboardTripAverage.onDestroyed(function () {
  averageCycleTripSettings = null
  tripAverageSettings      = null
})

Template.statsProductionIndicatorsDashboardTripAverage.helpers({
  tripAverage: function () {
    if (tripAverageSettings) {
      var month       = moment(this.value, 'YYYYMM')
      var tripAverage = tripAverageFor(month.format('YYYYMM'))
      var rounded     = Math.round(tripAverage * 10) / 10
      var cssClass    = 'warning'

      if (rounded < tripAverageSettings.min) cssClass = 'success'
      if (rounded > tripAverageSettings.max) cssClass = 'danger'

      return {
        value: _.isNumber(tripAverage) ? tripAverage.toFixed(1) : tripAverage,
        class: tripAverage !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})

