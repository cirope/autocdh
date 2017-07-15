var affectedTrucksSettings     = null
var businessDaysSettings       = null
var brokenTrucksSettings       = null
var trucksNotAvailableSettings = null
var truckAvailabilitySettings  = null

var truckAvailabilityFor = function (month) {
  var affectedTrucks     = _.findWhere(affectedTrucksSettings, { month: +month })
  var businessDays       = _.findWhere(businessDaysSettings, { month: +month })
  var brokenTrucks       = _.findWhere(brokenTrucksSettings, { month: +month })
  var trucksNotAvailable = _.findWhere(trucksNotAvailableSettings, { month: +month })

  if (affectedTrucks && affectedTrucks.value && businessDays && businessDays.value) {
    var truckHours   = affectedTrucks.value * businessDays.value
    var broken       = brokenTrucks && brokenTrucks.value || 0
    var notAvailable = trucksNotAvailable && trucksNotAvailable.value || 0

    return ((truckHours - (broken + notAvailable)) / truckHours) * 100
  } else {
    return TAPi18n.__('no_data_abbr')
  }
}

Template.statsProductionIndicatorsDashboardTruckAvailability.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var businessDays       = productionSettings && productionSettings.businessDays
  var affected           = productionSettings && productionSettings.affectedTrucks
  var trucksNotAvailable = productionSettings && productionSettings.trucksNotAvailable
  var brokenTrucks       = productionSettings && productionSettings.trucksNotAvailableForBreakage

  if (! businessDays || ! affected || ! trucksNotAvailable || ! brokenTrucks || ! indicators)
    return

  affectedTrucksSettings     = affected
  businessDaysSettings       = businessDays
  trucksNotAvailableSettings = trucksNotAvailable
  brokenTrucksSettings       = brokenTrucks
  truckAvailabilitySettings  = indicators.truckAvailabilityMin && indicators.truckAvailabilityMax && {
    min: indicators.truckAvailabilityMin,
    max: indicators.truckAvailabilityMax
  }
})

Template.statsProductionIndicatorsDashboardTruckAvailability.onDestroyed(function () {
  affectedTrucksSettings     = null
  businessDaysSettings       = null
  trucksNotAvailableSettings = null
  brokenTrucksSettings       = null
  truckAvailabilitySettings  = null
})

Template.statsProductionIndicatorsDashboardTruckAvailability.helpers({
  truckAvailability: function () {
    if (truckAvailabilitySettings) {
      var month             = moment(this.value, 'YYYYMM')
      var truckAvailability = truckAvailabilityFor(month.format('YYYYMM'))
      var rounded           = Math.round(truckAvailability * 10) / 10
      var cssClass          = 'warning'

      if (rounded < truckAvailabilitySettings.min) cssClass = 'danger'
      if (rounded > truckAvailabilitySettings.max) cssClass = 'success'

      return {
        value: _.isNumber(truckAvailability) ? truckAvailability.toFixed(1) + '%' : truckAvailability,
        class: truckAvailability !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
