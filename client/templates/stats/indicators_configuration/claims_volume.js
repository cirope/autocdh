var qaSettings = null

Template.statsIndicatorsConfigurationClaimsVolume.onCreated(function () {
  qaSettings = this.data && this.data.settings && this.data.settings.qa
})

Template.statsIndicatorsConfigurationClaimsVolume.onDestroyed(function () {
  qaSettings = null
})

Template.statsIndicatorsConfigurationClaimsVolume.helpers({
  claimsVolumeName: function () {
    return 'claims-volume-' + this.value
  },

  claimsVolumeValue: function () {
    var claimsVolume = qaSettings && qaSettings.claimsVolume
    var claimsVolume  = _.findWhere(claimsVolume, { month: this.value })

    return claimsVolume && claimsVolume.value
  },

  claimsVolumePrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'claims-volume-' + prevMonth
  }
})

Template.statsIndicatorsConfigurationClaimsVolume.events({
  'change [data-claims-volume-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('claimsVolumeMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'qa.claimsVolume': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'qa.claimsVolume.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'qa.claimsVolume': {
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
