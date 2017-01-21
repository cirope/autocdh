var productionSetting = null

Template.statsProductionIndicatorsConfigurationMaintenanceHours.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationMaintenanceHours.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationMaintenanceHours.helpers({
  maintenanceHoursName: function () {
    return 'maintenance-hours-' + this.value
  },

  maintenanceHoursValue: function () {
    var maintenanceHours  = productionSetting && productionSetting.maintenanceHours
    var _maintenanceHours = _.findWhere(maintenanceHours, { month: this.value })

    return _maintenanceHours && _maintenanceHours.value
  },

  maintenanceHoursPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'maintenance-hours-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationMaintenanceHours.events({
  'change [data-maintenance-hours-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('maintenanceHoursMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.maintenanceHours': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.maintenanceHours.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.maintenanceHours': {
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
