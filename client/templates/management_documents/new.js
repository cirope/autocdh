Template.managementDocumentNew.onDestroyed(function () {
  Session.set('documents.submitting')
})

Template.managementDocumentNew.helpers({
  filePlaceholder: function () {
    return TAPi18n.__('management_document_file_placeholder')
  },

  isSubmitting: function () {
    return Session.get('documents.submitting')
  }
})

AutoForm.addHooks('newManagementDocumentForm', {
  before: {
    method: function (doc) {
      Session.set('documents.submitting', true)

      return _.extend(doc, { _id: Random.id() })
    }
  },

  after: {
    method: function (error, result) {
      Session.set('documents.submitting')

      if (! error) Router.go('managementDocument', result)
    }
  }
})

AutoForm.addHooks('newManagementDocumentForm', {
  before: {
    method: CfsAutoForm.Hooks.beforeInsert
  },

  after: {
    method: CfsAutoForm.Hooks.afterInsert
  }
})
