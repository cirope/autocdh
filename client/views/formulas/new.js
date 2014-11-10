Template.formulaNew.helpers({
  strengthOptions: function () {
    return Strengths.find().map(function (strength) {
      return { value: strength._id, label: strength.name }
    })
  },

  settlementOptions: function () {
    return Settlements.find().map(function (settlement) {
      return { value: settlement._id, label: settlement.name }
    })
  },

  aggregateOptions: function () {
    return Aggregates.find().map(function (aggregate) {
      return { value: aggregate._id, label: aggregate.name }
    })
  },

  downloadOptions: function () {
    return Downloads.find().map(function (download) {
      return { value: download._id, label: download.name }
    })
  }
})

AutoForm.addHooks('newFormulaForm', {
  before: {
    createFormula: function (doc, template) {
      doc._id = Random.id()

      return doc
    }
  }
})
