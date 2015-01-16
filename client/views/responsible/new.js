Template.responsibleNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('responsible_name_placeholder')
  }
})

Template.responsibleNew.events({
  'click [data-cancel]': function (event) {
    event.stopPropagation()

    setTimeout(function () {
      Router.go('sampleNew')
    })
  }
})

AutoForm.addHooks('newResponsibleForm', {
  before: {
    createResponsible: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
