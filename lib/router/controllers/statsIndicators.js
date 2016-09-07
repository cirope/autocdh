StatsIndicatorsConfigurationController = RouteController.extend({
  data: function () {
    return {
      settings: Settings.findOne()
    }
  }
})
