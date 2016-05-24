var castQuery = function (query) {
  var selector = {}

  if (query.coding)   selector.coding = new RegExp('.*' + query.coding + '.*', 'gi')
  if (query.download) selector.download = query.download

  if (query.strength) {
    var strengths = Strengths.find({ name: new RegExp('.*' + query.strength + '.*', 'gi') })

    selector.strengthId = { $in: _.pluck(strengths.fetch(), '_id') }
  }

  if (query.aggregate) {
    var aggregates = Aggregates.find({ name: new RegExp('.*' + query.aggregate + '.*', 'gi') })

    selector.aggregateId = { $in: _.pluck(aggregates.fetch(), '_id') }
  }

  if (query.settlement) {
    var settlements = Settlements.find({ name: new RegExp('.*' + query.settlement + '.*', 'gi') })

    selector.settlementId = { $in: _.pluck(settlements.fetch(), '_id') }
  }

  return selector
}

FormulasController = RouteController.extend({
  data: function () {
    var query = this.params.query

    return {
      hasQuery: ! _.isEmpty(query),
      formulas: Formulas.find(_.isEmpty(query) ? {} : castQuery(query))
    }
  }
})

FormulaController = RouteController.extend({
  data: function () {
    return Formulas.findOne(this.params._id)
  }
})

FormulaNewController = RouteController.extend({
  data: function () {
    var materials      = Materials.first() || {}
    var defaultsFilter = function (obj) { return obj.default }
    var concretes      = _.filter(materials.concretes, defaultsFilter)
    var gravels        = _.filter(materials.gravels, defaultsFilter)
    var sands          = _.filter(materials.sands, defaultsFilter)

    return {
      concretes: _.map(concretes, function (concrete) {
        return { id: concrete._id }
      }),
      gravels: _.map(gravels, function (gravel) {
        return { id: gravel._id }
      }),
      sands: _.map(sands, function (sand) {
        return { id: sand._id }
      })
    }
  }
})
