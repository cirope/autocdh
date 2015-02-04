CracksController = RouteController.extend({
  data: function () {
    return { cracks: Cracks.find({ updatedAt: null }, { sort: { crackedIn: 1 } }) }
  }
})

CrackController = RouteController.extend({
  data: function () {
    return Cracks.findOne(this.params._id)
  }
})
