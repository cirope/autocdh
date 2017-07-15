var dispatchedSettings         = null
var affectedTrucksSettings     = null
var businessDaysSettings       = null
var averageWorkedHoursSettings = null
var m3ByHourSettings           = null

var m3ByHourFor = function (month) {
  var dispatched         = _.findWhere(dispatchedSettings, { month: +month })
  var affectedTrucks     = _.findWhere(affectedTrucksSettings, { month: +month })
  var businessDays       = _.findWhere(businessDaysSettings, { month: +month })
  var averageWorkedHours = _.findWhere(averageWorkedHoursSettings, { month: +month })

  if (dispatched && dispatched.value && affectedTrucks && affectedTrucks.value &&
    businessDays && businessDays.value && averageWorkedHours && averageWorkedHours.value)
    return (dispatched.value / affectedTrucks.value) / (businessDays.value * averageWorkedHours.value)
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardM3ByHour.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var volumes            = this.data.settings && this.data.settings.qa && this.data.settings.qa.dispatchedVolume
  var affected           = productionSettings && productionSettings.affectedTrucks
  var businessDays       = productionSettings && productionSettings.businessDays
  var averageWorkedHours = productionSettings && productionSettings.averageWorkedHours

  if (! volumes || ! affected || ! businessDays || ! averageWorkedHours || ! indicators)
    return

  dispatchedSettings         = volumes
  affectedTrucksSettings     = affected
  businessDaysSettings       = businessDays
  averageWorkedHoursSettings = averageWorkedHours
  m3ByHourSettings           = indicators.m3ByHourMin && indicators.m3ByHourMax && {
    min: indicators.m3ByHourMin,
    max: indicators.m3ByHourMax
  }
})

Template.statsProductionIndicatorsDashboardM3ByHour.onDestroyed(function () {
  dispatchedSettings         = null
  affectedTrucksSettings     = null
  businessDaysSettings       = null
  averageWorkedHoursSettings = null
  m3ByHourSettings           = null
})

Template.statsProductionIndicatorsDashboardM3ByHour.helpers({
  m3ByHour: function () {
    if (m3ByHourSettings) {
      var month    = moment(this.value, 'YYYYMM')
      var m3ByHour = m3ByHourFor(month.format('YYYYMM'))
      var rounded  = Math.round(m3ByHour * 10) / 10
      var cssClass = 'warning'

      if (rounded < m3ByHourSettings.min) cssClass = 'danger'
      if (rounded > m3ByHourSettings.max) cssClass = 'success'

      return {
        value: _.isNumber(m3ByHour) ? m3ByHour.toFixed(1) : m3ByHour,
        class: m3ByHour !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})

