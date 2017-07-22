AreaController = RouteController.extend({
  data: function () {
    return Areas.findOne(this.params._id)
  }
})
