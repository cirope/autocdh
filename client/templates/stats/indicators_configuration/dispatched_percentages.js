var qaSettings = null

Template.statsIndicatorsConfigurationDispatchedPercentages.onCreated(function () {
  qaSettings = this.data && this.data.settings && this.data.settings.qa
})

Template.statsIndicatorsConfigurationDispatchedPercentages.onDestroyed(function () {
  qaSettings = null
})

Template.statsIndicatorsConfigurationDispatchedPercentages.helpers({
  strengthTypes: function () {
    var types = ['lower_than_17', '17_to_20', '21_to_25', '30_to_35', 'greater_than_35']

    return _.map(types, function (type) {
      return {
        label: TAPi18n.__('stats_indicators_strength_category_' + type),
        value: type
      }
    })
  },

  dispatchedPercentageName: function (parentContext) {
    return 'dispatched-percentage-' + parentContext.value + '-' + this.value
  },

  dispatchedPercentageValue: function (parentContext) {
    var dispatchedPercentages = qaSettings && qaSettings.dispatchedPercentages
    var dispatchedPercentage  = _.findWhere(dispatchedPercentages, {
      type:  parentContext.value,
      month: this.value
    })

    return dispatchedPercentage && dispatchedPercentage.value
  },

  dispatchedPercentagePrevName: function (parentContext) {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'dispatched-percentage-' + parentContext.value + '-' + prevMonth
  }
})

Template.statsIndicatorsConfigurationDispatchedPercentages.events({
  'change [data-dispatched-percentage-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('dispatchedPercentageMonth')
    var type     = $input.data('dispatchedPercentageType')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'qa.dispatchedPercentages': {
        $elemMatch: {
          type:  type,
          month: month,
        }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'qa.dispatchedPercentages.$': {
            type:  type,
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'qa.dispatchedPercentages': {
            type:  type,
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
