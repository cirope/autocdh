var qaSettings = null

var checkMonth = function (month) {
  var $inputs  = $('[data-dispatched-percentage-month="' + month + '"]')
  var values   = $inputs.map(function (i, e) { return parseFloat($(e).val()) })
  var allValid = _.every(values, function (v) { return _.isNumber(v) && ! isNaN(v) })
  var total    = Stats.sum(values)
  var hasError = allValid && total < 75

  if (hasError)
    $inputs.closest('.form-group').addClass('has-error')
  else
    $inputs.closest('.form-group').removeClass('has-error')

  return ! hasError
}

Template.statsIndicatorsConfigurationDispatchedPercentages.onCreated(function () {
  qaSettings = this.data && this.data.settings && this.data.settings.qa
})

Template.statsIndicatorsConfigurationDispatchedPercentages.onRendered(function () {
  _.times(13, function (i) {
    var month = moment().subtract(12 - i, 'months')

    checkMonth(month.format('YYYYMM'))
  })
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

    if (checkMonth(month))
      $input.closest('.form-group').removeClass('has-error')

    $input.prop('disabled', true)

    Meteor.call('updateSettingValue', operation, id, selector, function (error, result) {
      if (error)
        $input.closest('.form-group').addClass('has-error')

      $input.removeProp('disabled')
    })
  }
})
