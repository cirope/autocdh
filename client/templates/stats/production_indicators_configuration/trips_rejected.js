var productionSetting = null

Template.statsProductionIndicatorsConfigurationTripsRejected.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationTripsRejected.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationTripsRejected.helpers({
  tripsRejectedName: function () {
    return 'trips-rejected-' + this.value
  },

  tripsRejectedValue: function () {
    var tripsRejected  = productionSetting && productionSetting.tripsRejected
    var _tripsRejected = _.findWhere(tripsRejected, { month: this.value })

    return _tripsRejected && _tripsRejected.value
  },

  tripsRejectedPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'trips-rejected-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationTripsRejected.events({
  'change [data-trips-rejected-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('tripsRejectedMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.tripsRejected': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.tripsRejected.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.tripsRejected': {
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
