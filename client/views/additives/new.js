Template.additiveNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('additive_name_placeholder')
  },

  backPath: function () {
    var params = Router.current() && Router.current().params

    return params && params.sample_id ?
      Router.path('concreteNew', { sample_id: params.sample_id }) :
      Router.path('parameters')
  }
})

AutoForm.addHooks('newAdditiveForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
