ParametersController = RouteController.extend({
  data: function () {
    return {
      strengths:   Strengths.find(),
      aggregates:  Aggregates.find(),
      settlements: Settlements.find(),
      additives:   Additives.find()
    }
  }
})
