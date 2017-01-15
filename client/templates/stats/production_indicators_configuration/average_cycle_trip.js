var productionSetting = null

Template.statsProductionIndicatorsConfigurationAverageCycleTrip.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationAverageCycleTrip.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationAverageCycleTrip.helpers({
  averageCycleTripName: function () {
    return 'average-cycle-trip-' + this.value
  },

  averageCycleTripValue: function () {
    var averageCycleTrip  = productionSetting && productionSetting.averageCycleTrip
    var _averageCycleTrip = _.findWhere(averageCycleTrip, { month: this.value })

    return _averageCycleTrip && _averageCycleTrip.value
  },

  averageCycleTripPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'average-cycle-trip-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationAverageCycleTrip.events({
  'change [data-average-cycle-trip-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('averageCycleTripMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.averageCycleTrip': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.averageCycleTrip.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.averageCycleTrip': {
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

