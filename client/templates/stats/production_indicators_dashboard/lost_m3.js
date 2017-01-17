var dispatchedSettings         = null
var affectedTrucksSettings     = null
var businessDaysSettings       = null
var brokenTrucksSettings       = null
var trucksNotAvailableSettings = null
var lostM3Settings             = null

var lostM3For = function (month) {
  var dispatched         = _.findWhere(dispatchedSettings, { month: +month })
  var affectedTrucks     = _.findWhere(affectedTrucksSettings, { month: +month })
  var businessDays       = _.findWhere(businessDaysSettings, { month: +month })
  var brokenTrucks       = _.findWhere(brokenTrucksSettings, { month: +month })
  var trucksNotAvailable = _.findWhere(trucksNotAvailableSettings, { month: +month })

  if (dispatched && dispatched.value && affectedTrucks && affectedTrucks.value && businessDays && businessDays.value) {
    var truckHours   = affectedTrucks.value * businessDays.value
    var broken       = brokenTrucks && brokenTrucks.value || 0
    var notAvailable = trucksNotAvailable && trucksNotAvailable.value || 0
    var availability = ((truckHours - (broken + notAvailable)) / truckHours) * 100

    return ((100 - availability) / 100) * dispatched.value
  } else {
    return TAPi18n.__('no_data_abbr')
  }
}

Template.statsProductionIndicatorsDashboardLostM3.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var volumes            = this.data.settings && this.data.settings.qa && this.data.settings.qa.dispatchedVolume
  var businessDays       = productionSettings && productionSettings.businessDays
  var affected           = productionSettings && productionSettings.affectedTrucks
  var trucksNotAvailable = productionSettings && productionSettings.trucksNotAvailable
  var brokenTrucks       = productionSettings && productionSettings.trucksNotAvailableForBreakage

  if (! volumes || ! businessDays || ! affected || ! trucksNotAvailable || ! brokenTrucks || ! indicators)
    return

  dispatchedSettings         = volumes
  affectedTrucksSettings     = affected
  businessDaysSettings       = businessDays
  trucksNotAvailableSettings = trucksNotAvailable
  brokenTrucksSettings       = brokenTrucks
  lostM3Settings             = indicators.lostM3Min && indicators.lostM3Max && {
    min: indicators.lostM3Min,
    max: indicators.lostM3Max
  }
})

Template.statsProductionIndicatorsDashboardLostM3.onDestroyed(function () {
  dispatchedSettings         = null
  affectedTrucksSettings     = null
  businessDaysSettings       = null
  trucksNotAvailableSettings = null
  brokenTrucksSettings       = null
  lostM3Settings             = null
})

Template.statsProductionIndicatorsDashboardLostM3.helpers({
  lostM3: function () {
    if (lostM3Settings) {
      var month     = moment(this.value, 'YYYYMM')
      var lostM3 = lostM3For(month.format('YYYYMM'))
      var rounded   = Math.round(lostM3 * 10) / 10
      var cssClass  = 'warning'

      if (rounded < lostM3Settings.min) cssClass = 'danger'
      if (rounded > lostM3Settings.max) cssClass = 'success'

      return {
        value: _.isNumber(lostM3) ? lostM3.toFixed(1) : lostM3,
        class: lostM3 !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
