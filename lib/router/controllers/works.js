WorksController = RouteController.extend({
  data: function () {
    return { works: Works.find({}, { sort: { name: 1 } }) }
  }
})

WorkController = RouteController.extend({
  data: function () {
    return Works.findOne(this.params._id)
  }
})
