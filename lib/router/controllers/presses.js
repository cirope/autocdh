PressesController = RouteController.extend({
  data: function () {
    return { presses: Presses.find() }
  }
})

PressController = RouteController.extend({
  data: function () {
    return Presses.findOne(this.params._id)
  }
})
