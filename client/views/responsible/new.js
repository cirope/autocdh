Template.responsibleNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('responsible_name_placeholder')
  }
})

AutoForm.addHooks('newResponsibleForm', {
  before: {
    createResponsible: function (doc, template) {
      doc._id = Random.id()

      return doc
    }
  }
})
