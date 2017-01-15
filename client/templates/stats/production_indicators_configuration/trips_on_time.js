var productionSetting = null

Template.statsProductionIndicatorsConfigurationTripsOnTime.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationTripsOnTime.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationTripsOnTime.helpers({
  tripsOnTimeName: function () {
    return 'trips-on-time-' + this.value
  },

  tripsOnTimeValue: function () {
    var tripsOnTime  = productionSetting && productionSetting.tripsOnTime
    var _tripsOnTime = _.findWhere(tripsOnTime, { month: this.value })

    return _tripsOnTime && _tripsOnTime.value
  },

  tripsOnTimePrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'trips-on-time-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationTripsOnTime.events({
  'change [data-trips-on-time-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('tripsOnTimeMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.tripsOnTime': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.tripsOnTime.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.tripsOnTime': {
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
