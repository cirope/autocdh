AutoForm.addHooks('newFormulaForm', {
  before: {
    createFormula: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
