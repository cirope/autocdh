OriginController = RouteController.extend({
  data: function () {
    return Origins.findOne(this.params._id)
  }
})
