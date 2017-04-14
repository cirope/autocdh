var helpers = {
  months: function () {
    return _.times(13, function (i) {
      var month = moment().subtract(12 - i, 'months')

      return {
        label: month.format('MMMYY').toUpperCase(),
        value: +month.format('YYYYMM')
      }
    })
  }
}

Template.statsProductionIndicatorsDashboard.helpers(helpers)

Template.statsProductionIndicatorsDashboardM3ByMixer.helpers(helpers)
Template.statsProductionIndicatorsDashboardM3ByHour.helpers(helpers)
Template.statsProductionIndicatorsDashboardTripsByMixer.helpers(helpers)
Template.statsProductionIndicatorsDashboardAverageTrip.helpers(helpers)
Template.statsProductionIndicatorsDashboardLostM3.helpers(helpers)

Template.statsProductionIndicatorsDashboardDispatchedVolume.helpers(helpers)

Template.statsProductionIndicatorsDashboardPunctuality.helpers(helpers)
Template.statsProductionIndicatorsDashboardUnfulfilledOrders.helpers(helpers)
Template.statsProductionIndicatorsDashboardRejectedTrucks.helpers(helpers)
Template.statsProductionIndicatorsDashboardComplaints.helpers(helpers)
Template.statsProductionIndicatorsDashboardTripAverage.helpers(helpers)
Template.statsProductionIndicatorsDashboardDownloadAverage.helpers(helpers)

Template.statsProductionIndicatorsDashboardProblematicPumps.helpers(helpers)
Template.statsProductionIndicatorsDashboardTruckBreakages.helpers(helpers)
Template.statsProductionIndicatorsDashboardTruckAvailability.helpers(helpers)
Template.statsProductionIndicatorsDashboardProductivityFactor.helpers(helpers)
Template.statsProductionIndicatorsDashboardMaintenance.helpers(helpers)
