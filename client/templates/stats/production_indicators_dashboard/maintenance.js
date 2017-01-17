var affectedTrucksSettings     = null
var businessDaysSettings       = null
var averageWorkedHoursSettings = null
var maintenanceHoursSettings   = null
var maintenanceSettings        = null

var maintenanceFor = function (month) {
  var affectedTrucks     = _.findWhere(affectedTrucksSettings, { month: +month })
  var businessDays       = _.findWhere(businessDaysSettings, { month: +month })
  var averageWorkedHours = _.findWhere(averageWorkedHoursSettings, { month: +month })
  var maintenanceHours   = _.findWhere(maintenanceHoursSettings, { month: +month })

  if (affectedTrucks && affectedTrucks.value && businessDays && businessDays.value &&
    averageWorkedHours && averageWorkedHours.value && maintenanceHours && maintenanceHours.value) {
    var truckHours   = affectedTrucks.value * businessDays.value * averageWorkedHours.value

    return (maintenanceHours.value / truckHours) * 100
  } else {
    return TAPi18n.__('no_data_abbr')
  }
}

Template.statsProductionIndicatorsDashboardMaintenance.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var businessDays       = productionSettings && productionSettings.businessDays
  var affected           = productionSettings && productionSettings.affectedTrucks
  var averageWorkedHours = productionSettings && productionSettings.averageWorkedHours
  var maintenanceHours   = productionSettings && productionSettings.maintenanceHours

  if (! businessDays || ! affected || ! averageWorkedHours || ! maintenanceHours || ! indicators)
    return

  affectedTrucksSettings     = affected
  businessDaysSettings       = businessDays
  averageWorkedHoursSettings = averageWorkedHours
  maintenanceHoursSettings   = maintenanceHours
  maintenanceSettings        = indicators.maintenanceMin && indicators.maintenanceMax && {
    min: indicators.maintenanceMin,
    max: indicators.maintenanceMax
  }
})

Template.statsProductionIndicatorsDashboardMaintenance.onDestroyed(function () {
  affectedTrucksSettings     = null
  businessDaysSettings       = null
  averageWorkedHoursSettings = null
  maintenanceHoursSettings   = null
  maintenanceSettings        = null
})

Template.statsProductionIndicatorsDashboardMaintenance.helpers({
  maintenance: function () {
    if (maintenanceSettings) {
      var month       = moment(this.value, 'YYYYMM')
      var maintenance = maintenanceFor(month.format('YYYYMM'))
      var rounded     = Math.round(maintenance * 10) / 10
      var cssClass    = 'success'

      if (rounded < maintenanceSettings.min) cssClass = 'danger'
      if (rounded > maintenanceSettings.max) cssClass = 'warning'

      return {
        value: _.isNumber(maintenance) ? maintenance.toFixed(1) + '%' : maintenance,
        class: maintenance !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
