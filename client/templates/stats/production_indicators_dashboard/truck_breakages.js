var tripsSettings         = null
var truckBreaksSettings   = null
var truckBreakagesSettings = null

var truckBreakagesFor = function (month) {
  var trips       = _.findWhere(tripsSettings, { month: +month })
  var truckBreaks = _.findWhere(truckBreaksSettings, { month: +month })

  if (trips && trips.value && truckBreaks && truckBreaks.value)
    return (truckBreaks.value / trips.value) * 100
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardTruckBreakages.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var trips              = productionSettings && productionSettings.trips
  var truckBreaks        = productionSettings && productionSettings.truckBreaks

  if (! trips || ! truckBreaks || ! indicators) return

  tripsSettings         = trips
  truckBreaksSettings   = truckBreaks
  truckBreakagesSettings = indicators.truckBreakagesMin && indicators.truckBreakagesMax && {
    min: indicators.truckBreakagesMin,
    max: indicators.truckBreakagesMax
  }
})

Template.statsProductionIndicatorsDashboardTruckBreakages.onDestroyed(function () {
  tripsSettings         = null
  truckBreaksSettings   = null
  truckBreakagesSettings = null
})

Template.statsProductionIndicatorsDashboardTruckBreakages.helpers({
  truckBreakages: function () {
    if (truckBreakagesSettings) {
      var month         = moment(this.value, 'YYYYMM')
      var truckBreakages = truckBreakagesFor(month.format('YYYYMM'))
      var rounded       = Math.round(truckBreakages * 10) / 10
      var cssClass      = 'warning'

      if (rounded < truckBreakagesSettings.min) cssClass = 'success'
      if (rounded > truckBreakagesSettings.max) cssClass = 'danger'

      return {
        value: _.isNumber(truckBreakages) ? truckBreakages.toFixed(1) + '%' : truckBreakages,
        class: truckBreakages !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
