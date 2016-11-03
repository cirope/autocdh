var qaSettings = null

Template.statsIndicatorsConfigurationDispatchedVolume.onCreated(function () {
  qaSettings = this.data && this.data.settings && this.data.settings.qa
})

Template.statsIndicatorsConfigurationDispatchedVolume.onDestroyed(function () {
  qaSettings = null
})

Template.statsIndicatorsConfigurationDispatchedVolume.helpers({
  dispatchedVolumeName: function () {
    return 'dispatched-volume-' + this.value
  },

  dispatchedVolumeValue: function () {
    var dispatchedVolume = qaSettings && qaSettings.dispatchedVolume
    var dispatchedVolume  = _.findWhere(dispatchedVolume, { month: this.value })

    return dispatchedVolume && dispatchedVolume.value
  },

  dispatchedVolumePrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'dispatched-volume-' + prevMonth
  }
})

Template.statsIndicatorsConfigurationDispatchedVolume.events({
  'change [data-dispatched-volume-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('dispatchedVolumeMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'qa.dispatchedVolume': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'qa.dispatchedVolume.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'qa.dispatchedVolume': {
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
