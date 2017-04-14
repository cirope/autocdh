
var subs        = new SubsManager

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
  if (query.fieldDate) selector.fieldDate = dateRange(query.fieldDate)

  return selector
}

CompactionsController = RouteController.extend({
  increment: 30,

  compactionsLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { fieldDate: -1 }, limit: this.compactionsLimit() }
  },

  subscriptions: function () {
    this.compactionsSub = subs.subscribe('compactionsLimited', this.findOptions())
  },

  compactions: function (query) {
    return Compactions.find(_.isEmpty(query) ? {} : castQuery(query), this.findOptions())
  },

  data: function () {
    var hasMore  = this.compactions(this.params.query).count() === this.compactionsLimit()
    var nextPath = this.route.path({ limit: this.compactionsLimit() + this.increment })

    return {
      compactions:  this.compactions(this.params.query),
      ready:        this.compactionsSub.ready,
      nextPath:     hasMore ? nextPath : null,
      hasQuery:     ! _.isEmpty(this.params.query)
    }
  }
})

CompactionEditController = RouteController.extend({
  data: function () {
    return Compactions.findOne(this.params._id)
  }
})

CompactionController = RouteController.extend({
  data: function () {
    return Compactions.findOne(this.params._id)
  }
})
