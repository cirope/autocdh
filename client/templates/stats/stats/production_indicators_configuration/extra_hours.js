var productionSetting = null

Template.statsProductionIndicatorsConfigurationExtraHours.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationExtraHours.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationExtraHours.helpers({
  extraHoursName: function () {
    return 'extra-hours-' + this.value
  },

  extraHoursValue: function () {
    var extraHours  = productionSetting && productionSetting.extraHours
    var _extraHours = _.findWhere(extraHours, { month: this.value })

    return _extraHours && _extraHours.value
  },

  extraHoursPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'extra-hours-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationExtraHours.events({
  'change [data-extra-hours-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('extraHoursMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.extraHours': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.extraHours.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.extraHours': {
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
