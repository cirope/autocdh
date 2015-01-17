var formula = new ReactiveVar({})
var save    = function () {
  formula.set(AutoForm.getFormValues('newFormulaForm').insertDoc)
}

Template.formulaNew.helpers({
  formula: function () {
    return formula.get()
  }
})

Template.formulaNew.events({
  'change [name="strengthId"]': function (event) {
    var strength = $(event.currentTarget)

    if (strength.val() === 'new') {
      strength.val('')
      save()
      AutoForm.resetForm('newFormulaForm')
      Router.go('formulaStrengthNew')
    }
  },

  'change [name="settlementId"]': function (event) {
    var settlement = $(event.currentTarget)

    if (settlement.val() === 'new') {
      settlement.val('')
      save()
      AutoForm.resetForm('newFormulaForm')
      Router.go('formulaSettlementNew')
    }
  },

  'change [name="aggregateId"]': function (event) {
    var aggregate = $(event.currentTarget)

    if (aggregate.val() === 'new') {
      aggregate.val('')
      save()
      AutoForm.resetForm('newFormulaForm')
      Router.go('formulaAggregateNew')
    }
  }
})

AutoForm.addHooks('newFormulaForm', {
  before: {
    createFormula: function (doc, template) {
      formula.set({})

      return _.extend(doc, { _id: Random.id() })
    }
  }
})
