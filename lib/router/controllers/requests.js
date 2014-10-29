RequestsController = RouteController.extend({
  data: function () {
    return { requests: Requests.find() }
  }
})

RequestController = RouteController.extend({
  data: function () {
    return Requests.findOne(this.params._id)
  }
})
