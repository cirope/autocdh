FormulasController = RouteController.extend({
  data: function () {
    return { formulas: Formulas.find() }
  }
})

FormulaController = RouteController.extend({
  data: function () {
    return Formulas.findOne(this.params._id)
  }
})

FormulaNewController = RouteController.extend({
  data: function () {
    var materials      = Materials.findOne() || {}
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
