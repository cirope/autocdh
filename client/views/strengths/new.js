Template.strengthNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('strength_name_placeholder')
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

AutoForm.addHooks('newStrengthForm', {
  before: {
    createStrength: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
