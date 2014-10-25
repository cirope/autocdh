Template.workNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('work_name_placeholder')
  },

  customerId: function () {
    return this.customer._id
  }
})

AutoForm.addHooks('newWorkForm', {
  before: {
    createWork: function (doc, template) {
      var valid = AutoForm.validateForm('newWorkForm')
      doc._id   = Random.id()

      if (valid) AutoForm.resetForm('newWorkForm')

      return valid && doc
    }
  },

  beginSubmit: function (formId, template) {}, // Do not disable submit button
  endSubmit:   function (formId, template) {}
})
