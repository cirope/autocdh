var subs = new SubsManager

GranulometriesController = RouteController.extend({
  increment: 10,

  granulometriesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { date: -1 }, limit: this.granulometriesLimit() }
  },

  subscriptions: function () {
    this.granulometriesSub = subs.subscribe('granulometriesLimited', this.findOptions())
  },

  granulometries: function () {
    return Granulometries.find({}, this.findOptions())
  },

  data: function () {
    var hasMore  = this.granulometries().count() === this.granulometriesLimit()
    var nextPath = this.route.path({ limit: this.granulometriesLimit() + this.increment })

    return {
      granulometries: this.granulometries(),
      ready:          this.granulometriesSub.ready,
      nextPath:       hasMore ? nextPath : null
    }
  }
})

GranulometryController = RouteController.extend({
  data: function () {
    return Granulometries.findOne(this.params._id)
  }
})
