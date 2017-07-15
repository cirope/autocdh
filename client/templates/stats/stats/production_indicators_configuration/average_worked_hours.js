var productionSetting = null

Template.statsProductionIndicatorsConfigurationAverageWorkedHours.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationAverageWorkedHours.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationAverageWorkedHours.helpers({
  averageWorkedHoursName: function () {
    return 'average-worked-hours-' + this.value
  },

  averageWorkedHoursValue: function () {
    var averageWorkedHours  = productionSetting && productionSetting.averageWorkedHours
    var _averageWorkedHours = _.findWhere(averageWorkedHours, { month: this.value })

    return _averageWorkedHours && _averageWorkedHours.value
  },

  averageWorkedHoursPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'average-worked-hours-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationAverageWorkedHours.events({
  'change [data-average-worked-hours-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('averageWorkedHoursMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.averageWorkedHours': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.averageWorkedHours.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.averageWorkedHours': {
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
