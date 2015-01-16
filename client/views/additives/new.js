Template.additiveNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('additive_name_placeholder')
  },

  sampleId: function () {
    return Router.current() && Router.current().params.sample_id
  }
})

AutoForm.addHooks('newAdditiveForm', {
  before: {
    createAdditive: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
