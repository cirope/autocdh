SamplesController = RouteController.extend({
  data: function () {
    return { samples: Samples.find({}, { sort: { date: -1 } }) }
  }
})

SampleController = RouteController.extend({
  data: function () {
    return Samples.findOne(this.params._id)
  }
})
