var productionSetting = null

Template.statsProductionIndicatorsConfigurationPumps.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationPumps.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationPumps.helpers({
  pumpsName: function () {
    return 'pumps-' + this.value
  },

  pumpsValue: function () {
    var pumps  = productionSetting && productionSetting.pumps
    var _pumps = _.findWhere(pumps, { month: this.value })

    return _pumps && _pumps.value
  },

  pumpsPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'pumps-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationPumps.events({
  'change [data-pumps-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('pumpsMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.pumps': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.pumps.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.pumps': {
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
