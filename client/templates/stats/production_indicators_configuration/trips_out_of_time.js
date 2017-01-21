var productionSetting = null

Template.statsProductionIndicatorsConfigurationTripsOutOfTime.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationTripsOutOfTime.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationTripsOutOfTime.helpers({
  tripsOutOfTimeName: function () {
    return 'trips-out-of-time-' + this.value
  },

  tripsOutOfTimeValue: function () {
    var tripsOutOfTime  = productionSetting && productionSetting.tripsOutOfTime
    var _tripsOutOfTime = _.findWhere(tripsOutOfTime, { month: this.value })

    return _tripsOutOfTime && _tripsOutOfTime.value
  },

  tripsOutOfTimePrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'trips-out-of-time-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationTripsOutOfTime.events({
  'change [data-trips-out-of-time-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('tripsOutOfTimeMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.tripsOutOfTime': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.tripsOutOfTime.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.tripsOutOfTime': {
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
