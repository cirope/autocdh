var concrete = new ReactiveVar({})
var save     = function () {
  concrete.set(AutoForm.getFormValues('newConcreteForm').insertDoc)
}

Template._concreteNew.helpers({
  concrete: function () {
    return concrete.get()
  }
})

Template._concreteNew.events({
  'change [data-formula-component]': function () {
    var params       = Router.current() && Router.current().params
    var strengthId   = $('[name="strengthId"]').val()
    var downloadId   = $('[name="downloadId"]').val()
    var aggregateId  = $('[name="aggregateId"]').val()
    var settlementId = $('[name="settlementId"]').val()
    var formula      = Formulas.findOne({
      strengthId:   strengthId,
      downloadId:   downloadId,
      aggregateId:  aggregateId,
      settlementId: settlementId
    })

    if (params)
      Router.go(
        'concreteNew',
        { sample_id: params.sample_id },
        formula && { query: { formula_id: formula._id } }
      )
  },

  'change [name="strengthId"]': function (event) {
    var strength = $(event.currentTarget)
    var params   = Router.current() && Router.current().params

    if (strength.val() === 'new') {
      strength.val('')
      save()
      AutoForm.resetForm('newConcreteForm')
      Router.go('strengthNew', { sample_id: params && params.sample_id })
    }
  },

  'change [name="downloadId"]': function (event) {
    var download = $(event.currentTarget)
    var params   = Router.current() && Router.current().params

    if (download.val() === 'new') {
      download.val('')
      save()
      AutoForm.resetForm('newConcreteForm')
      Router.go('downloadNew', { sample_id: params && params.sample_id })
    }
  }
})

AutoForm.addHooks('newConcreteForm', {
  before: {
    createConcrete: function (doc, template) {
      concrete.set({})

      return _.extend(doc, { _id: Random.id() })
    }
  }
})
