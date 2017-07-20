CriteriaController = RouteController.extend({
  data: function () {
    return {
      strengths:   Strengths.find(),
      settlements: Settlements.find(),
      deviations:  Deviations.find(),
      settings:    Settings.find()
    }
  }
})
