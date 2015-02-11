AdditiveController = RouteController.extend({
  data: function () {
    return Additives.findOne(this.params._id)
  }
})
