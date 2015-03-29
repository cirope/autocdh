CriteriaController = RouteController.extend({
  data: function () {
    return {
      strengths:   Strengths.find(),
      settlements: Settlements.find()
    }
  }
})
