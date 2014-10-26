PlantsController = RouteController.extend({
  data: function () { return { plants: Plants.find() } }
})

PlantController = RouteController.extend({
  data: function () { return Plants.findOne(this.params._id) }
})
