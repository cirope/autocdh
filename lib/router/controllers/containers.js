ContainersController = RouteController.extend({
  data: function () {
    return { containers: Containers.find() }
  }
})

ContainerController = RouteController.extend({
  data: function () {
    return Containers.findOne(this.params._id)
  }
})
