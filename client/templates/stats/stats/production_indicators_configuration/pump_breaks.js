var productionSetting = null

Template.statsProductionIndicatorsConfigurationPumpBreaks.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationPumpBreaks.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationPumpBreaks.helpers({
  pumpBreaksName: function () {
    return 'pump-breaks-' + this.value
  },

  pumpBreaksValue: function () {
    var pumpBreaks  = productionSetting && productionSetting.pumpBreaks
    var _pumpBreaks = _.findWhere(pumpBreaks, { month: this.value })

    return _pumpBreaks && _pumpBreaks.value
  },

  pumpBreaksPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'pump-breaks-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationPumpBreaks.events({
  'change [data-pump-breaks-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('pumpBreaksMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.pumpBreaks': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.pumpBreaks.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.pumpBreaks': {
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
