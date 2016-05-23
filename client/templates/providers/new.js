Template.providerNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('provider_name_placeholder')
  },

  backPath: function () {
    return Router.path('providers')
  }
})

AutoForm.addHooks('newProviderForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
