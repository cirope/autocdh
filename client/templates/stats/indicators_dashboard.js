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

Template.statsIndicatorsDashboard.helpers(helpers)

Template.statsIndicatorsDashboardResistance7Days.helpers(helpers)
Template.statsIndicatorsDashboardDeviation.helpers(helpers)
Template.statsIndicatorsDashboardDeviationCoefficient.helpers(helpers)
Template.statsIndicatorsDashboardResistanceRatio.helpers(helpers)
Template.statsIndicatorsDashboardEfficiency.helpers(helpers)
Template.statsIndicatorsDashboardVolume.helpers(helpers)
Template.statsIndicatorsDashboardClaimsPercentage.helpers(helpers)
Template.statsIndicatorsDashboardNonconformPercentage.helpers(helpers)
