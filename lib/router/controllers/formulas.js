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
