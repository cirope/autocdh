SamplesController = RouteController.extend({
  data: function () {
    return { samples: Samples.find() }
  }
})

SampleController = RouteController.extend({
  data: function () {
    return Samples.findOne(this.params._id)
  }
})
