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
  if (query.work) selector.work = new RegExp('.*' + query.work + '.*', 'gi')
  if (query.fieldDate) selector.fieldDate = dateRange(query.fieldDate)
  if (query.labDate) selector.labDate = dateRange(query.labDate)

  return selector
}

FieldDensitiesController = RouteController.extend({
  increment: 30,

  fieldDensitiesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { fieldDate: -1 }, limit: this.fieldDensitiesLimit() }
  },

  subscriptions: function () {
    this.fieldDensitiesSub = this.subscribe('fieldDensitiesLimited', this.findOptions())
  },

  fieldDensities: function (query) {
    return FieldDensities.find(_.isEmpty(query) ? {} : castQuery(query), this.findOptions())
  },

  data: function () {
    var hasMore  = this.fieldDensities(this.params.query).count() === this.fieldDensitiesLimit()
    var nextPath = this.route.path({ limit: this.fieldDensitiesLimit() + this.increment })

    return {
      fieldDensities: this.fieldDensities(this.params.query),
      ready:          this.fieldDensitiesSub.ready,
      nextPath:       hasMore ? nextPath : null,
      hasQuery:       ! _.isEmpty(this.params.query)
    }
  }
})

FieldDensityEditController = RouteController.extend({
  data: function () {
    return FieldDensities.findOne(this.params._id)
  }
})

FieldDensityController = RouteController.extend({
  data: function () {
    return FieldDensities.findOne(this.params._id)
  }
})
