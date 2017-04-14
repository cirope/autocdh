var productionSetting = null

Template.statsProductionIndicatorsConfigurationFailedDeliveries.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationFailedDeliveries.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationFailedDeliveries.helpers({
  failedDeliveriesName: function () {
    return 'failed-deliveries-' + this.value
  },

  failedDeliveriesValue: function () {
    var failedDeliveries  = productionSetting && productionSetting.failedDeliveries
    var _failedDeliveries = _.findWhere(failedDeliveries, { month: this.value })

    return _failedDeliveries && _failedDeliveries.value
  },

  failedDeliveriesPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'failed-deliveries-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationFailedDeliveries.events({
  'change [data-failed-deliveries-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('failedDeliveriesMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.failedDeliveries': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.failedDeliveries.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.failedDeliveries': {
            month: month,
            value: +$input.val()
          }
        }
      }
    }

    $input.prop('disabled', true)
    $input.closest('.form-group').removeClass('has-error')

    Meteor.call('updateSettingValue', operation, id, selector, function (error, result) {
      if (error)
        $input.closest('.form-group').addClass('has-error')

      $input.removeProp('disabled')
    })
  }
})

