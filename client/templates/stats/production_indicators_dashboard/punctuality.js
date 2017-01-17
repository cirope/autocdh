var tripsSettings        = null
var tripsOnTimeSettings  = null
var businessDaysSettings = null
var punctualitySettings  = null

var punctualityFor = function (month) {
  var trips        = _.findWhere(tripsSettings, { month: +month })
  var tripsOnTime  = _.findWhere(tripsOnTimeSettings, { month: +month })
  var businessDays = _.findWhere(businessDaysSettings, { month: +month })

  if (trips && trips.value && tripsOnTime && tripsOnTime.value && businessDays && businessDays.value)
    return (tripsOnTime.value / trips.value) * businessDays.value * 100
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardPunctuality.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var trips              = productionSettings && productionSettings.trips
  var tripsOnTime        = productionSettings && productionSettings.tripsOnTime
  var businessDays       = productionSettings && productionSettings.businessDays

  if (! trips || ! tripsOnTime || ! businessDays || ! indicators) return

  tripsSettings        = trips
  tripsOnTimeSettings  = tripsOnTime
  businessDaysSettings = businessDays
  punctualitySettings  = indicators.punctualityMin && indicators.punctualityMax && {
    min: indicators.punctualityMin,
    max: indicators.punctualityMax
  }
})

Template.statsProductionIndicatorsDashboardPunctuality.onDestroyed(function () {
  tripsSettings        = null
  tripsOnTimeSettings  = null
  businessDaysSettings = null
  punctualitySettings  = null
})

Template.statsProductionIndicatorsDashboardPunctuality.helpers({
  punctuality: function () {
    if (punctualitySettings) {
      var month       = moment(this.value, 'YYYYMM')
      var punctuality = punctualityFor(month.format('YYYYMM'))
      var rounded     = Math.round(punctuality * 10) / 10
      var cssClass    = 'warning'

      if (rounded < punctualitySettings.min) cssClass = 'danger'
      if (rounded > punctualitySettings.max) cssClass = 'success'

      return {
        value: _.isNumber(punctuality) ? punctuality.toFixed(1) + '%' : punctuality,
        class: punctuality !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
