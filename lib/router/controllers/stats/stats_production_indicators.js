StatsProductionIndicatorsConfigurationController = RouteController.extend({
  data: function () {
    return {
      settings: Settings.findOne()
    }
  }
})

StatsProductionIndicatorsDashboardController = RouteController.extend({
  data: function () {
    return {
      settings:  Settings.findOne()
    }
  }
})
