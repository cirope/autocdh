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
  }
})

AutoForm.addHooks('newConcreteForm', {
  before: {
    createConcrete: function (doc, template) {
      setTimeout(function () { formulaId.set(undefined) })

      return _.extend(doc, { _id: Random.id() })
    }
  }
})
