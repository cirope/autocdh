var events = {
  'change [data-formula-component]': function (event, template) {
    var router       = Router.current()
    var params       = router && router.params
    var routeName    = router && router.route.getName()
    var strengthId   = $('[name="strengthId"]').val()
    var download     = $('[name="download"]').val()
    var aggregateId  = $('[name="aggregateId"]').val()
    var settlementId = $('[name="settlementId"]').val()
    var formula      = Formulas.findOne({
      strengthId:   strengthId,
      download:     download,
      aggregateId:  aggregateId,
      settlementId: settlementId
    }, {
      sort: { createdAt: -1 }
    })

    if (params) {
      Router.go(
        routeName,
        params._id ? { _id: params._id } : { sample_id: params.sample_id },
        formula && { query: { formula_id: formula._id } }
      )
    }
  }
}

Template._concreteNew.events(events)
Template._concreteEdit.events(events)
