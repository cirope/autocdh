var dispatchedSettings        = null
var failedDeliveriesSettings  = null
var businessDaysSettings      = null
var unfulfilledOrdersSettings = null

var unfulfilledOrdersFor = function (month) {
  var dispatched       = _.findWhere(dispatchedSettings, { month: +month })
  var failedDeliveries = _.findWhere(failedDeliveriesSettings, { month: +month })
  var businessDays     = _.findWhere(businessDaysSettings, { month: +month })

  if (dispatched && dispatched.value && failedDeliveries && failedDeliveries.value && businessDays && businessDays.value)
    return ((failedDeliveries.value * businessDays.value) / dispatched.value) * 100
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardUnfulfilledOrders.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var volumes            = this.data.settings && this.data.settings.qa && this.data.settings.qa.dispatchedVolume
  var failedDeliveries   = productionSettings && productionSettings.failedDeliveries
  var businessDays       = productionSettings && productionSettings.businessDays

  if (! volumes || ! failedDeliveries || ! businessDays || ! indicators) return

  dispatchedSettings        = volumes
  failedDeliveriesSettings  = failedDeliveries
  businessDaysSettings      = businessDays
  unfulfilledOrdersSettings = indicators.unfulfilledOrdersMin && indicators.unfulfilledOrdersMax && {
    min: indicators.unfulfilledOrdersMin,
    max: indicators.unfulfilledOrdersMax
  }
})

Template.statsProductionIndicatorsDashboardUnfulfilledOrders.onDestroyed(function () {
  dispatchedSettings        = null
  failedDeliveriesSettings  = null
  businessDaysSettings      = null
  unfulfilledOrdersSettings = null
})

Template.statsProductionIndicatorsDashboardUnfulfilledOrders.helpers({
  unfulfilledOrders: function () {
    if (unfulfilledOrdersSettings) {
      var month             = moment(this.value, 'YYYYMM')
      var unfulfilledOrders = unfulfilledOrdersFor(month.format('YYYYMM'))
      var rounded           = Math.round(unfulfilledOrders * 10) / 10
      var cssClass          = 'warning'

      if (rounded < unfulfilledOrdersSettings.min) cssClass = 'success'
      if (rounded > unfulfilledOrdersSettings.max) cssClass = 'danger'

      return {
        value: _.isNumber(unfulfilledOrders) ? unfulfilledOrders.toFixed(1) + '%' : unfulfilledOrders,
        class: unfulfilledOrders !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
