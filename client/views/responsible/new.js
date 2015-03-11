Template.responsibleNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('responsible_name_placeholder')
  },

  backPath: function () {
    var routeName = Router.current() && Router.current().route.getName()

    return routeName === 'sampleResponsibleNew' ?
      Router.path('sampleNew') : Router.path('responsibleIndex')
  }
})

AutoForm.addHooks('newResponsibleForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
