var formula = function () {
    var data = this.params._id ? Concretes.findOne(this.params._id) : {}

    data.sample = Samples.findOne(this.params.sample_id)

    if (this.params.query.formula_id) {
      var formula = Formulas.findOne(this.params.query.formula_id)

      data.strengthId   = formula.strengthId
      data.settlementId = formula.settlementId
      data.aggregateId  = formula.aggregateId
      data.download     = formula.download
      data.water        = formula.water
      data.concretes    = _.clone(formula.concretes)
      data.sands        = _.clone(formula.sands)
      data.gravels      = _.clone(formula.gravels)
    } else if (! data.concretes) {
      var materials      = Materials.first() || {}
      var defaultsFilter = function (obj) { return obj.default }
      var mapId          = function (obj) { return { id: obj._id } }
      var concretes      = _.filter(materials.concretes, defaultsFilter)
      var gravels        = _.filter(materials.gravels, defaultsFilter)
      var sands          = _.filter(materials.sands, defaultsFilter)

      data.concretes = _.map(concretes, mapId)
      data.sands     = _.map(sands, mapId)
      data.gravels   = _.map(gravels, mapId)
    }

    return data
}

ConcreteNewController = RouteController.extend({
  action: function () {
    var concrete = Concretes.findOne({ sampleId: this.params.sample_id })

    if (concrete)
      this.redirect('concreteEdit', concrete)
    else
      this.render('concreteNew')
  },

  data: function () {
    return formula.apply(this)
  }
})

ConcreteEditController = RouteController.extend({
  data: function () {
    return formula.apply(this)
  }
})

ConcreteController = RouteController.extend({
  data: function () {
    return Concretes.findOne(this.params._id)
  }
})
