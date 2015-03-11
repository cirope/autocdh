var concrete = new ReactiveVar
var save     = function () {
  concrete.set(AutoForm.getFormValues('newConcreteForm').insertDoc)
}

Template._concreteNew.helpers({
  concrete: function () {
    if (! concrete.get()) concrete.set(this)

    return concrete.get()
  },

  additive: function () {
    var additiveId = AutoForm.getFieldValue('additiveId', 'newConcreteForm')
    var additive   = additiveId && Additives.findOne(additiveId)

    return additive
  }
})

Template._concreteNew.events({
  'change [data-formula-component]': function (event, template) {
    var params       = Router.current() && Router.current().params
    var strengthId   = $('[name="strengthId"]').val()
    var download     = $('[name="download"]').val()
    var aggregateId  = $('[name="aggregateId"]').val()
    var settlementId = $('[name="settlementId"]').val()
    var formula      = Formulas.findOne({
      strengthId:   strengthId,
      download:     download,
      aggregateId:  aggregateId,
      settlementId: settlementId
    })

    if (params) {
      setTimeout(function () { concrete.set() })

      Router.go(
        'concreteNew',
        { sample_id: params.sample_id },
        formula && { query: { formula_id: formula._id } }
      )
    }
  },

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
    var params   = Router.current() && Router.current().params

    if (aggregate.val() === 'new') {
      aggregate.val('')
      setTimeout(function () { concrete.set() })
      AutoForm.resetForm('newConcreteForm')
      Router.go('aggregateNew', { sample_id: params && params.sample_id })
    }
  },

  'change [name="settlementId"]': function (event) {
    var settlement = $(event.currentTarget)
    var params   = Router.current() && Router.current().params

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
