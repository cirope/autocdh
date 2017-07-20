var formula = new ReactiveVar
var save    = function () {
  formula.set(AutoForm.getFormValues('newFormulaForm').insertDoc)
}

Template.formulaNew.helpers({
  formula: function () {
    if (! formula.get()) formula.set(this)

    return formula.get()
  },

  backPath: function () {
    var params = Router.current() && Router.current().params

    return params && params.sample_id ?
      Router.path('concreteNew', { sample_id: params.sample_id }) :
      Router.path('formulas')
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
    method: function (doc) {
      if (AutoForm.validateForm('newFormulaForm'))
        setTimeout(function () { formula.set() }, 300)

      return _.extend(doc, { _id: Random.id() })
    }
  }
})
