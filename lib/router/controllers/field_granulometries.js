
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

FieldGranulometriesController = RouteController.extend({
  increment: 30,

  fieldGranulometriesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { fieldDate: -1 }, limit: this.fieldGranulometriesLimit() }
  },

  subscriptions: function () {
    this.fieldGranulometriesSub = subs.subscribe('fieldGranulometriesLimited', this.findOptions())
  },

  fieldGranulometries: function (query) {
    return FieldGranulometries.find(_.isEmpty(query) ? {} : castQuery(query), this.findOptions())
  },

  data: function () {
    var hasMore  = this.fieldGranulometries(this.params.query).count() === this.fieldGranulometriesLimit()
    var nextPath = this.route.path({ limit: this.fieldGranulometriesLimit() + this.increment })

    return {
      fieldGranulometries: this.fieldGranulometries(this.params.query),
      ready:               this.fieldGranulometriesSub.ready,
      nextPath:            hasMore ? nextPath : null,
      hasQuery:            ! _.isEmpty(this.params.query)
    }
  }
})

FieldGranulometryEditController = RouteController.extend({
  data: function () {
    return FieldGranulometries.findOne(this.params._id)
  }
})

FieldGranulometryController = RouteController.extend({
  data: function () {
    return FieldGranulometries.findOne(this.params._id)
  }
})
