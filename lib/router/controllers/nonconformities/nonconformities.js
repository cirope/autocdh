/*
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
*/

NonconformitiesController = RouteController.extend({
  increment: 30,

  limitsParam: function () {
    return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { fieldDate: -1 }, limit: this.limitsParam() }
  },

  subscriptions: function () {
    this.objectsSub = this.subscribe('nonconformitiesLimited', this.findOptions())
  },

  objects: function (query) {
    return Nonconformities.find(_.isEmpty(query) ? {} : castQuery(query), this.findOptions())
  },

  data: function () {
    var hasMore  = this.limits(this.params.query).count() === this.limitsParam()
    var nextPath = this.route.path({ limit: this.limitsParam() + this.increment })

    return {
      objects:    this.objects(this.params.query),
      ready:      this.objectsSub.ready,
      nextPath:   hasMore ? nextPath : null,
      hasQuery:   ! _.isEmpty(this.params.query)
    }
  }
})

NonconformityEditController = RouteController.extend({
  data: function () {
    return Limits.findOne(this.params._id)
  }
})

NonconformityController = RouteController.extend({
  data: function () {
    return Limits.findOne(this.params._id)
  }
})
