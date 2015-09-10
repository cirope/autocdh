var concrete = new ReactiveVar
var save     = function () {
  concrete.set(AutoForm.getFormValues('newConcreteForm').insertDoc)
}

Template._concreteNew.helpers({
  concrete: function () {
    concrete.set(Template.currentData())

    return concrete.get()
  }
})

Template._concreteNew.events({
  'change [name="strengthId"]': function (event) {
    var strength = $(event.currentTarget)
    var params   = Router.current() && Router.current().params

    if (strength.val() === 'new') {
      strength.val('')
      setTimeout(function () { concrete.set() })
      AutoForm.resetForm('newConcreteForm')
      Router.go('strengthNew', { sample_id: params && params.sample_id })
    }
  },

  'change [name="aggregateId"]': function (event) {
    var aggregate = $(event.currentTarget)
    var params    = Router.current() && Router.current().params

    if (aggregate.val() === 'new') {
      aggregate.val('')
      setTimeout(function () { concrete.set() })
      AutoForm.resetForm('newConcreteForm')
      Router.go('aggregateNew', { sample_id: params && params.sample_id })
    }
  },

  'change [name="settlementId"]': function (event) {
    var settlement = $(event.currentTarget)
    var params     = Router.current() && Router.current().params

    if (settlement.val() === 'new') {
      settlement.val('')
      setTimeout(function () { concrete.set() })
      AutoForm.resetForm('newConcreteForm')
      Router.go('settlementNew', { sample_id: params && params.sample_id })
    }
  },

  'change [name="additiveId"]': function (event) {
    var additive = $(event.currentTarget)
    var params   = Router.current() && Router.current().params

    if (additive.val() === 'new') {
      additive.val('')
      save()
      AutoForm.resetForm('newConcreteForm')
      Router.go('additiveNew', { sample_id: params && params.sample_id })
    }
  }
})

AutoForm.addHooks('newConcreteForm', {
  before: {
    method: function (doc) {
      if (AutoForm.validateForm('newConcreteForm'))
        setTimeout(function () { concrete.set() }, 300)

      return _.extend(doc, { _id: Random.id() })
    }
  }
})
