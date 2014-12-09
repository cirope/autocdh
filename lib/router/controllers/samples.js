var subs = new SubsManager

SamplesController = RouteController.extend({
  increment: 10,

  samplesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { date: -1 }, limit: this.samplesLimit() }
  },

  waitOn: function () {
    return subs.subscribe('samplesLimited', this.findOptions())
  },

  samples: function () {
    return Samples.find({}, this.findOptions())
  },

  data: function () {
    var hasMore  = this.samples().count() === this.samplesLimit()
    var nextPath = this.route.path({ limit: this.samplesLimit() + this.increment })

    return {
      samples:  this.samples(),
      nextPath: hasMore ? nextPath : null
    }
  }
})

SampleController = RouteController.extend({
  data: function () {
    return Samples.findOne(this.params._id)
  }
})
