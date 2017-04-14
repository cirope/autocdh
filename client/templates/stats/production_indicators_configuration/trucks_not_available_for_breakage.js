var productionSetting = null

Template.statsProductionIndicatorsConfigurationTrucksNotAvailableForBreakage.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationTrucksNotAvailableForBreakage.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationTrucksNotAvailableForBreakage.helpers({
  trucksNotAvailableForBreakageName: function () {
    return 'trucks-not-available-for-breakage-' + this.value
  },

  trucksNotAvailableForBreakageValue: function () {
    var trucksNotAvailableForBreakage  = productionSetting && productionSetting.trucksNotAvailableForBreakage
    var _trucksNotAvailableForBreakage = _.findWhere(trucksNotAvailableForBreakage, { month: this.value })

    return _trucksNotAvailableForBreakage && _trucksNotAvailableForBreakage.value
  },

  trucksNotAvailableForBreakagePrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'trucks-not-available-for-breakage-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationTrucksNotAvailableForBreakage.events({
  'change [data-trucks-not-available-for-breakage-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('trucksNotAvailableForBreakageMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.trucksNotAvailableForBreakage': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.trucksNotAvailableForBreakage.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.trucksNotAvailableForBreakage': {
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
