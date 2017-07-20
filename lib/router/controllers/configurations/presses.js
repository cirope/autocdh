PressesController = RouteController.extend({
  data: function () {
    return { presses: Presses.find() }
  }
})

PressController = RouteController.extend({
  data: function () {
    var press = Presses.findOne(this.params._id)

    if (press)
      press.canDelete = ! Cracks.find({ pressId: press._id }).count()

    return press
  }
})
