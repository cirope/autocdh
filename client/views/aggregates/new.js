Template.aggregateNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('aggregate_name_placeholder')
  },

  backPath: function () {
    var params = Router.current() && Router.current().params

    return params && params.sample_id ?
      Router.path('concreteFormulaNew', { sample_id: params.sample_id }) :
      Router.path('formulaNew')
  },

  sampleId: function () {
    return Router.current() && Router.current().params.sample_id
  }
})

AutoForm.addHooks('newAggregateForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
