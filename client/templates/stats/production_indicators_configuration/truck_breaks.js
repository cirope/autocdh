var productionSetting = null

Template.statsProductionIndicatorsConfigurationTruckBreaks.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationTruckBreaks.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationTruckBreaks.helpers({
  truckBreaksName: function () {
    return 'truck-breaks-' + this.value
  },

  truckBreaksValue: function () {
    var truckBreaks  = productionSetting && productionSetting.truckBreaks
    var _truckBreaks = _.findWhere(truckBreaks, { month: this.value })

    return _truckBreaks && _truckBreaks.value
  },

  truckBreaksPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'truck-breaks-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationTruckBreaks.events({
  'change [data-truck-breaks-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('truckBreaksMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.truckBreaks': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.truckBreaks.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.truckBreaks': {
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
