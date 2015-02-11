AggregateController = RouteController.extend({
  data: function () {
    return Aggregates.findOne(this.params._id)
  }
})
