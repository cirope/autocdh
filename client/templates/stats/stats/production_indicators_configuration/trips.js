var productionSetting = null

Template.statsProductionIndicatorsConfigurationTrips.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationTrips.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationTrips.helpers({
  tripsName: function () {
    return 'trips-' + this.value
  },

  tripsValue: function () {
    var trips  = productionSetting && productionSetting.trips
    var _trips = _.findWhere(trips, { month: this.value })

    return _trips && _trips.value
  },

  tripsPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'trips-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationTrips.events({
  'change [data-trips-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('tripsMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.trips': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.trips.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.trips': {
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
