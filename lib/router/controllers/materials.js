MaterialsController = RouteController.extend({
  data: function () {
    return { materials: Materials.find() }
  }
})

MaterialController = RouteController.extend({
  data: function () {
    return Materials.findOne(this.params._id)
  }
})
