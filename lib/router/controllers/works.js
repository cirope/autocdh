WorksController = RouteController.extend({
  data: function () {
    return { works: Works.find() }
  }
})

WorkController = RouteController.extend({
  data: function () {
    return Works.findOne(this.params._id)
  }
})
