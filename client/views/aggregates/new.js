Template.aggregateNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('aggregate_name_placeholder')
  },

  sampleId: function () {
    return Router.current() && Router.current().params.sample_id
  }
})

AutoForm.addHooks('newAggregateForm', {
  before: {
    createAggregate: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
