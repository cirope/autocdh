var productionSetting = null

Template.statsProductionIndicatorsConfigurationReportedProblems.onCreated(function () {
  productionSetting = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationReportedProblems.onDestroyed(function () {
  productionSetting = null
})

Template.statsProductionIndicatorsConfigurationReportedProblems.helpers({
  reportedProblemsName: function () {
    return 'reported-problems-' + this.value
  },

  reportedProblemsValue: function () {
    var reportedProblems  = productionSetting && productionSetting.reportedProblems
    var _reportedProblems = _.findWhere(reportedProblems, { month: this.value })

    return _reportedProblems && _reportedProblems.value
  },

  reportedProblemsPrevName: function () {
    var prevMonth = moment(this.value, 'YYYYMM').subtract(1, 'month').format('YYYYMM')

    return 'reported-problems-' + prevMonth
  }
})

Template.statsProductionIndicatorsConfigurationReportedProblems.events({
  'change [data-reported-problems-month]': function (event, template) {
    var $input   = $(event.currentTarget)
    var month    = $input.data('reportedProblemsMonth')
    var id       = template.data.settings && template.data.settings._id
    var selector = {
      'production.reportedProblems': {
        $elemMatch: { month: month }
      }
    }
    var operation = {
      modifier: {
        $set: {
          'production.reportedProblems.$': {
            month: month,
            value: +$input.val()
          }
        }
      },

      aggregation: {
        $addToSet: {
          'production.reportedProblems': {
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
