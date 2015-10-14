var dateRange = function (date) {
  return {
    $gte: date.clone().startOf('day').toDate(),
    $lte: date.clone().endOf('day').toDate()
  }
}

var castQuery = function (query) {
  var selector = {}

  if (query.name)    selector.name    = new RegExp('.*' + query.name + '.*', 'gi')
  if (query.date)    selector.date    = dateRange(moment(query.date))
  if (query.molding) selector.molding = query.molding

  if (query.plant) {
    var plants = Plants.find({ name: new RegExp('.*' + query.plant + '.*', 'gi') })

    selector.plantId = { $in: _.pluck(plants.fetch(), '_id') }
  }

  if (query.customer) {
    var customers = Customers.find({ name: new RegExp('.*' + query.customer + '.*', 'gi') })
    var receipts  = Receipts.find({ customerId: { $in: _.pluck(customers.fetch(), '_id') } })

    selector._id = { $in: _.pluck(receipts.fetch(), 'sampleId') }
  }

  return selector
}

var subs = new SubsManager

SamplesController = RouteController.extend({
  increment: 30,

  samplesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { date: -1 }, limit: this.samplesLimit() }
  },

  subscriptions: function () {
    this.samplesSub = subs.subscribe('samplesLimited', this.findOptions())
  },

  samples: function (query) {
    return Samples.find(query ? castQuery(query) : {}, this.findOptions())
  },

  data: function () {
    var hasMore  = this.samples(this.params.query).count() === this.samplesLimit()
    var nextPath = this.route.path({ limit: this.samplesLimit() + this.increment }, { query: this.params.query })

    return {
      samples:  this.samples(this.params.query),
      ready:    this.samplesSub.ready,
      nextPath: hasMore ? nextPath : null,
      query:    this.params.query
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
      sampleReceipt:  sample && Receipts.findOne({ sampleId: sample._id }),
      sampleConcrete: sample && Concretes.findOne({ sampleId: sample._id }),
      sampleHumidity: sample && Humidities.findOne({ sampleId: sample._id }),
      sampleAssay:    sample && Assays.findOne({ sampleId: sample._id }),
      sampleCracks:   sample && Cracks.find({ sampleId: sample._id }, { sort: { crackIn: 1, number: 1 } })
    }
  }
})
