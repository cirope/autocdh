var qaSettings = null

Template.statsIndicatorsConfigurationNonconformVolume.onCreated(function () {
  qaSettings = this.data && this.data.settings && this.data.settings.qa
})

Template.statsIndicatorsConfigurationNonconformVolume.onDestroyed(function () {
  qaSettings = null
})

Template.statsIndicatorsConfigurationNonconformVolume.helpers({
  nonconformVolumeName: function () {
    return 'nonconform-volume-' + this.value
  },

  nonconformVolumeValue: function () {
    var nonconformVolume = qaSettings && qaSettings.nonconformVolume
    var nonconformVolume  = _.findWhere(nonconformVolume, { month: this.value })

    return nonconformVolume && nonconformVolume.value
  },

  nonconformVolumePrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'nonconform-volume-' + prevMonth
  }
})

Template.statsIndicatorsConfigurationNonconformVolume.events({
  'change [data-nonconform-volume-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('nonconformVolumeMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'qa.nonconformVolume': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'qa.nonconformVolume.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'qa.nonconformVolume': {
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
