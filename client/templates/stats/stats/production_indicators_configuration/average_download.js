var productionSetting = null

Template.statsProductionIndicatorsConfigurationAverageDownload.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationAverageDownload.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationAverageDownload.helpers({
  averageDownloadName: function () {
    return 'average-download-' + this.value
  },

  averageDownloadValue: function () {
    var averageDownload  = productionSetting && productionSetting.averageDownload
    var _averageDownload = _.findWhere(averageDownload, { month: this.value })

    return _averageDownload && _averageDownload.value
  },

  averageDownloadPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'average-download-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationAverageDownload.events({
  'change [data-average-download-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('averageDownloadMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.averageDownload': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.averageDownload.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.averageDownload': {
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

