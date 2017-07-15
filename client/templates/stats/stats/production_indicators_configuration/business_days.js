var productionSetting = null

Template.statsProductionIndicatorsConfigurationBusinessDays.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationBusinessDays.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationBusinessDays.helpers({
  businessDaysName: function () {
    return 'business-days-' + this.value
  },

  businessDaysValue: function () {
    var businessDays  = productionSetting && productionSetting.businessDays
    var _businessDays = _.findWhere(businessDays, { month: this.value })

    return _businessDays && _businessDays.value
  },

  businessDaysPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'business-days-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationBusinessDays.events({
  'change [data-business-days-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('businessDaysMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.businessDays': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.businessDays.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.businessDays': {
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
