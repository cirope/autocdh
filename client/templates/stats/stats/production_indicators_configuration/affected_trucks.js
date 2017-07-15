var productionSetting = null

Template.statsProductionIndicatorsConfigurationAffectedTrucks.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationAffectedTrucks.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationAffectedTrucks.helpers({
  affectedTrucksName: function () {
    return 'affected-trucks-' + this.value
  },

  affectedTrucksValue: function () {
    var affectedTrucks  = productionSetting && productionSetting.affectedTrucks
    var _affectedTrucks = _.findWhere(affectedTrucks, { month: this.value })

    return _affectedTrucks && _affectedTrucks.value
  },

  affectedTrucksPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'affected-trucks-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationAffectedTrucks.events({
  'change [data-affected-trucks-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('affectedTrucksMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.affectedTrucks': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.affectedTrucks.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.affectedTrucks': {
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
