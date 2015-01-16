Template.strengthNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('strength_name_placeholder')
  },

  sampleId: function () {
    return Router.current() && Router.current().params.sample_id
  }
})

AutoForm.addHooks('newStrengthForm', {
  before: {
    createStrength: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
