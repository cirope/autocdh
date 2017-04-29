MixturesController = RouteController.extend({
  increment: 30,

  mixturesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { date: -1 }, limit: this.mixturesLimit() }
  },

  subscriptions: function () {
    this.mixturesSub = this.subscribe('mixturesLimited', this.findOptions())
  },

  mixtures: function (query) {
    return Mixtures.find({}, this.findOptions())
  },

  data: function () {
    var hasMore  = this.mixtures(this.params.query).count() === this.mixturesLimit()
    var nextPath = this.route.path({ limit: this.mixturesLimit() + this.increment })

    return {
      mixtures: this.mixtures(this.params.query),
      ready:    this.mixturesSub.ready,
      nextPath: hasMore ? nextPath : null,
      hasQuery: ! _.isEmpty(this.params.query)
    }
  }
})

MixtureController = RouteController.extend({
  data: function () {
    return Mixtures.findOne(this.params._id)
  }
})
