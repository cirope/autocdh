Template.formulaSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('formula_search_placeholder')
  },

  settings: function () {
    var formulasRule = {
      collection:      Formulas,
      field:           'coding',
      matchAll:        true,
      template:        Template.formulaPill,
      noMatchTemplate: Template.emptyFormulaPill
    }

    return {
      limit: 10,
      rules: [formulasRule]
    }
  }
})

Template.formulaSearch.events({
  'autocompleteselect #formula-search': function (event, template, doc) {
    var router       = Router.current()
    var params       = router && router.params
    var routeName    = router && router.route.getName()

    if (params) {
      Router.go(
        routeName,
        params._id ? { _id: params._id } : { sample_id: params.sample_id },
        doc && { query: { formula_id: doc._id } }
      )
    }
  }
})
