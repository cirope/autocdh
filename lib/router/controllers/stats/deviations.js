DeviationsController = RouteController.extend({
  data: function () {
    return { deviations: Deviations.find() }
  }
})

DeviationController = RouteController.extend({
  data: function () {
    return Deviations.findOne(this.params._id)
  }
})
