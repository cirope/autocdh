var productionSetting = null

Template.statsProductionIndicatorsConfigurationTrucksNotAvailable.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationTrucksNotAvailable.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationTrucksNotAvailable.helpers({
  trucksNotAvailableName: function () {
    return 'trucks-not-available-' + this.value
  },

  trucksNotAvailableValue: function () {
    var trucksNotAvailable  = productionSetting && productionSetting.trucksNotAvailable
    var _trucksNotAvailable = _.findWhere(trucksNotAvailable, { month: this.value })

    return _trucksNotAvailable && _trucksNotAvailable.value
  },

  trucksNotAvailablePrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'trucks-not-available-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationTrucksNotAvailable.events({
  'change [data-trucks-not-available-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('trucksNotAvailableMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.trucksNotAvailable': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.trucksNotAvailable.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.trucksNotAvailable': {
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
