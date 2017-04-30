var dateRange = function (date) {
  var range = date.split('|')

  return {
    $gte: moment(_.first(range)).startOf('day').toDate(),
    $lte: moment(_.last(range)).endOf('day').toDate()
  }
}

var castQuery = function (query) {
  var selector = {}

  if (query.sampleName) selector.sampleName = new RegExp('.*' + query.sampleName + '.*', 'gi')
  if (query.origin) selector.origin = new RegExp('.*' + query.origin + '.*', 'gi')
  if (query.fieldDate) selector.fieldDate = dateRange(query.fieldDate)

  return selector
}

LimitsController = RouteController.extend({
  increment: 30,

  limitsLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { fieldDate: -1 }, limit: this.limitsLimit() }
  },

  subscriptions: function () {
    this.limitsSub = this.subscribe('limitsLimited', this.findOptions())
  },

  limits: function (query) {
    return Limits.find(_.isEmpty(query) ? {} : castQuery(query), this.findOptions())
  },

  data: function () {
    var hasMore  = this.limits(this.params.query).count() === this.limitsLimit()
    var nextPath = this.route.path({ limit: this.limitsLimit() + this.increment })

    return {
      limits:     this.limits(this.params.query),
      ready:      this.limitsSub.ready,
      nextPath:   hasMore ? nextPath : null,
      hasQuery:   ! _.isEmpty(this.params.query)
    }
  }
})

LimitEditController = RouteController.extend({
  data: function () {
    return Limits.findOne(this.params._id)
  }
})

LimitController = RouteController.extend({
  data: function () {
    return Limits.findOne(this.params._id)
  }
})
