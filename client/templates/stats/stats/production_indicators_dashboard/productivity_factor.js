var affectedTrucksSettings     = null
var businessDaysSettings       = null
var brokenTrucksSettings       = null
var averageWorkedHoursSettings = null
var maintenanceHoursSettings   = null
var productivityFactorSettings = null

var productivityFactorFor = function (month) {
  var affectedTrucks     = _.findWhere(affectedTrucksSettings, { month: +month })
  var businessDays       = _.findWhere(businessDaysSettings, { month: +month })
  var brokenTrucks       = _.findWhere(brokenTrucksSettings, { month: +month })
  var averageWorkedHours = _.findWhere(averageWorkedHoursSettings, { month: +month })
  var maintenanceHours   = _.findWhere(maintenanceHoursSettings, { month: +month })

  if (affectedTrucks && affectedTrucks.value && businessDays && businessDays.value &&
    averageWorkedHours && averageWorkedHours.value && maintenanceHours && maintenanceHours.value) {
    var truckHours   = affectedTrucks.value * businessDays.value * averageWorkedHours.value
    var brokenHours  = (brokenTrucks && brokenTrucks.value || 0) * averageWorkedHours.value

    return ((truckHours - maintenanceHours.value - brokenHours) / truckHours) * 100
  } else {
    return TAPi18n.__('no_data_abbr')
  }
}

Template.statsProductionIndicatorsDashboardProductivityFactor.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var businessDays       = productionSettings && productionSettings.businessDays
  var affected           = productionSettings && productionSettings.affectedTrucks
  var averageWorkedHours = productionSettings && productionSettings.averageWorkedHours
  var maintenanceHours   = productionSettings && productionSettings.maintenanceHours
  var brokenTrucks       = productionSettings && productionSettings.trucksNotAvailableForBreakage

  if (! businessDays || ! affected || ! averageWorkedHours || ! maintenanceHours || ! brokenTrucks || ! indicators)
    return

  affectedTrucksSettings     = affected
  businessDaysSettings       = businessDays
  averageWorkedHoursSettings = averageWorkedHours
  maintenanceHoursSettings   = maintenanceHours
  brokenTrucksSettings       = brokenTrucks
  productivityFactorSettings = indicators.productivityFactorMin && indicators.productivityFactorMax && {
    min: indicators.productivityFactorMin,
    max: indicators.productivityFactorMax
  }
})

Template.statsProductionIndicatorsDashboardProductivityFactor.onDestroyed(function () {
  affectedTrucksSettings     = null
  businessDaysSettings       = null
  averageWorkedHoursSettings = null
  maintenanceHoursSettings   = null
  brokenTrucksSettings       = null
  productivityFactorSettings = null
})

Template.statsProductionIndicatorsDashboardProductivityFactor.helpers({
  productivityFactor: function () {
    if (productivityFactorSettings) {
      var month              = moment(this.value, 'YYYYMM')
      var productivityFactor = productivityFactorFor(month.format('YYYYMM'))
      var rounded            = Math.round(productivityFactor * 10) / 10
      var cssClass           = 'success'

      if (rounded < productivityFactorSettings.min) cssClass = 'danger'
      if (rounded > productivityFactorSettings.max) cssClass = 'warning'

      return {
        value: _.isNumber(productivityFactor) ? productivityFactor.toFixed(1) + '%' : productivityFactor,
        class: productivityFactor !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
