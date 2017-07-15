var helpers = {
  months: function () {
    return _.times(13, function (i) {
      var month = moment().subtract(12 - i, 'months')

      return {
        label: month.format('MMMYY').toUpperCase(),
        value: +month.format('YYYYMM')
      }
    })
  },

  showCopy: function () {
    var firstMonth = moment().subtract(12, 'months')

    return this.value !== +firstMonth.format('YYYYMM')
  }
}

Template.statsProductionIndicatorsConfigurationBusinessDays.helpers(helpers)
Template.statsProductionIndicatorsConfigurationAverageWorkedHours.helpers(helpers)
Template.statsProductionIndicatorsConfigurationExtraHours.helpers(helpers)
Template.statsProductionIndicatorsConfigurationAffectedTrucks.helpers(helpers)
Template.statsProductionIndicatorsConfigurationTrips.helpers(helpers)
Template.statsProductionIndicatorsConfigurationPumps.helpers(helpers)
Template.statsProductionIndicatorsConfigurationMaintenanceHours.helpers(helpers)
Template.statsProductionIndicatorsConfigurationTruckBreaks.helpers(helpers)
Template.statsProductionIndicatorsConfigurationPumpBreaks.helpers(helpers)
Template.statsProductionIndicatorsConfigurationTrucksNotAvailableForBreakage.helpers(helpers)
Template.statsProductionIndicatorsConfigurationTrucksNotAvailable.helpers(helpers)
Template.statsProductionIndicatorsConfigurationTripsRejected.helpers(helpers)
Template.statsProductionIndicatorsConfigurationReportedProblems.helpers(helpers)
Template.statsProductionIndicatorsConfigurationFailedDeliveries.helpers(helpers)
Template.statsProductionIndicatorsConfigurationTripsOutOfTime.helpers(helpers)
Template.statsProductionIndicatorsConfigurationAverageCycleTrip.helpers(helpers)
Template.statsProductionIndicatorsConfigurationAverageDownload.helpers(helpers)

Template.statsProductionIndicatorsConfiguration.events({
  'click [data-copy-from]': function (event, template) {
    $element     = $(event.currentTarget)
    $sourceInput = template.$('[name="' + $element.data('copyFrom') + '"]')
    $targetInput = template.$('[name="' + $element.data('copyTo') + '"]')

    $targetInput.val($sourceInput.val()).trigger('change')
  }
})
