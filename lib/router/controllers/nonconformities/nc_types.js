NcTypeController = RouteController.extend({
  data: function () {
    return NcTypes.findOne(this.params._id)
  }
})
