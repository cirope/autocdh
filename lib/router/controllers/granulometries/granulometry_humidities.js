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

GranulometryHumiditiesController = RouteController.extend({
  increment: 30,

  granulometryHumiditiesLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { date: -1 }, limit: this.granulometryHumiditiesLimit() }
  },

  subscriptions: function () {
    this.granulometryHumiditiesSub = this.subscribe('granulometryHumiditiesLimited', this.findOptions())
  },

  granulometryHumidities: function (query) {
    return GranulometryHumidities.find(_.isEmpty(query) ? {} : castQuery(query), this.findOptions())
  },

  data: function () {
    var hasMore  = this.granulometryHumidities(this.params.query).count() === this.granulometryHumiditiesLimit()
    var nextPath = this.route.path({ limit: this.granulometryHumiditiesLimit() + this.increment })

    return {
      granulometryHumidities: this.granulometryHumidities(this.params.query),
      ready:                  this.granulometryHumiditiesSub.ready,
      nextPath:               hasMore ? nextPath : null,
      hasQuery:               ! _.isEmpty(this.params.query)
    }
  }
})

GranulometryHumidityController = RouteController.extend({
  data: function () {
    return GranulometryHumidities.findOne(this.params._id)
  }
})
