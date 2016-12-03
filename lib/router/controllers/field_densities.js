var dateRange = function (date) {
  var range = date.split('|')

  return {
    $gte: moment(_.first(range)).startOf('day').toDate(),
    $lte: moment(_.last(range)).endOf('day').toDate()
  }
}

var castQuery = function (query) {
  var selector = {}

  if (query.name) selector.name = new RegExp('.*' + query.name + '.*', 'gi')
  if (query.date) selector.date = dateRange(query.date)

  if (+query.fineness)
    selector.fineness = {
      $gt: +query.fineness - 0.1,
      $lt: +query.fineness + 0.1
    }

  if (query.material) {
    var regexp    = new RegExp('.*' + query.material + '.*', 'gi')
    var material  = Materials.findOne()
    var materials = _.union(material.sands, material.gravels)
    var materials = _.filter(materials, function (m) {
      return regexp.test(m.name)
    })

    selector.materialId = { $in: _.pluck(materials, '_id') }
  }

  if (query.plant) {
    var plants = Plants.find({ name: new RegExp('.*' + query.plant + '.*', 'gi') })

    selector.plantId = { $in: _.pluck(plants.fetch(), '_id') }
  }

  if (query.provider) {
    var providers = Providers.find({ name: new RegExp('.*' + query.provider + '.*', 'gi') })

    selector.providerId = { $in: _.pluck(providers.fetch(), '_id') }
  }

  return selector
}

var subs        = new SubsManager
var processTest = function (fieldDensity) {
  return {}
}

FieldDensitiesController = RouteController.extend({
  increment: 30,

  fieldDensitiesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { date: -1 }, limit: this.fieldDensitiesLimit() }
  },

  subscriptions: function () {
    this.fieldDensitiesSub = subs.subscribe('fieldDensitiesLimited', this.findOptions())
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
    var fieldDensity    = FieldDensities.findOne(this.params._id)
    var extraAttributes = fieldDensity && processTest(fieldDensity)

    return fieldDensity && _.extend(fieldDensity, extraAttributes)
  }
})
