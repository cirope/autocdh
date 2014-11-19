CracksController = RouteController.extend({
  data: function () {
    return { cracks: Cracks.find() }
  }
})

CrackController = RouteController.extend({
  data: function () {
    return Cracks.findOne(this.params._id)
  }
})
