var tripsSettings          = null
var tripsRejectedSettings  = null
var rejectedTrucksSettings = null

var rejectedTrucksFor = function (month) {
  var trips         = _.findWhere(tripsSettings, { month: +month })
  var tripsRejected = _.findWhere(tripsRejectedSettings, { month: +month })

  if (trips && trips.value && tripsRejected && tripsRejected.value)
    return (tripsRejected.value / trips.value) * 100
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardRejectedTrucks.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var trips              = productionSettings && productionSettings.trips
  var tripsRejected      = productionSettings && productionSettings.tripsRejected

  if (! trips || ! tripsRejected || ! indicators) return

  tripsSettings          = trips
  tripsRejectedSettings  = tripsRejected
  rejectedTrucksSettings = indicators.rejectedTrucksMin && indicators.rejectedTrucksMax && {
    min: indicators.rejectedTrucksMin,
    max: indicators.rejectedTrucksMax
  }
})

Template.statsProductionIndicatorsDashboardRejectedTrucks.onDestroyed(function () {
  tripsSettings          = null
  tripsRejectedSettings  = null
  rejectedTrucksSettings = null
})

Template.statsProductionIndicatorsDashboardRejectedTrucks.helpers({
  rejectedTrucks: function () {
    if (rejectedTrucksSettings) {
      var month          = moment(this.value, 'YYYYMM')
      var rejectedTrucks = rejectedTrucksFor(month.format('YYYYMM'))
      var rounded        = Math.round(rejectedTrucks * 10) / 10
      var cssClass       = 'warning'

      if (rounded < rejectedTrucksSettings.min) cssClass = 'success'
      if (rounded > rejectedTrucksSettings.max) cssClass = 'danger'

      return {
        value: _.isNumber(rejectedTrucks) ? rejectedTrucks.toFixed(1) + '%' : rejectedTrucks,
        class: rejectedTrucks !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
