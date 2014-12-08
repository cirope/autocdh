Template.workNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('work_name_placeholder')
  }
})

AutoForm.addHooks('newWorkForm', {
  before: {
    createWork: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
