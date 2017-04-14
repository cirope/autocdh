var tripsSettings          = null
var tripsOutOfTimeSettings = null
var businessDaysSettings   = null
var punctualitySettings    = null

var punctualityFor = function (month) {
  var trips          = _.findWhere(tripsSettings, { month: +month })
  var tripsOutOfTime = _.findWhere(tripsOutOfTimeSettings, { month: +month })
  var businessDays   = _.findWhere(businessDaysSettings, { month: +month })

  if (trips && trips.value && tripsOutOfTime && _.isNumber(tripsOutOfTime.value) && businessDays && businessDays.value)
    return (1 - (tripsOutOfTime.value / trips.value) * businessDays.value) * 100
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardPunctuality.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var trips              = productionSettings && productionSettings.trips
  var tripsOutOfTime     = productionSettings && productionSettings.tripsOutOfTime
  var businessDays       = productionSettings && productionSettings.businessDays

  if (! trips || ! tripsOutOfTime || ! businessDays || ! indicators) return

  tripsSettings          = trips
  tripsOutOfTimeSettings = tripsOutOfTime
  businessDaysSettings   = businessDays
  punctualitySettings    = indicators.punctualityMin && indicators.punctualityMax && {
    min: indicators.punctualityMin,
    max: indicators.punctualityMax
  }
})

Template.statsProductionIndicatorsDashboardPunctuality.onDestroyed(function () {
  tripsSettings          = null
  tripsOutOfTimeSettings = null
  businessDaysSettings   = null
  punctualitySettings    = null
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
