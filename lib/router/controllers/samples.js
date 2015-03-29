var subs = new SubsManager

SamplesController = RouteController.extend({
  increment: 10,

  samplesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { date: -1 }, limit: this.samplesLimit() }
  },

  subscriptions: function () {
    this.samplesSub = subs.subscribe('samplesLimited', this.findOptions())
  },

  samples: function () {
    return Samples.find({}, this.findOptions())
  },

  data: function () {
    var hasMore  = this.samples().count() === this.samplesLimit()
    var nextPath = this.route.path({ limit: this.samplesLimit() + this.increment })

    return {
      samples:  this.samples(),
      ready:    this.samplesSub.ready,
      nextPath: hasMore ? nextPath : null
    }
  }
})

SampleNewController = RouteController.extend({
  data: function () {
    var lastSample = Samples.findOne({}, { sort: { createdAt: -1 } })

    return {
      date: lastSample && lastSample.date
    }
  }
})

SampleController = RouteController.extend({
  data: function () {
    var sample = Samples.findOne(this.params._id)

    return {
      sample:         sample,
      sampleReceipt:  Receipts.findOne({ sampleId: sample._id }),
      sampleConcrete: Concretes.findOne({ sampleId: sample._id }),
      sampleHumidity: Humidities.findOne({ sampleId: sample._id }),
      sampleAssay:    Assays.findOne({ sampleId: sample._id })
    }
  }
})
