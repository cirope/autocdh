Template.documentNew.onDestroyed(function () {
  Session.set('documents.submitting')
})

Template.documentNew.helpers({
  filePlaceholder: function () {
    return TAPi18n.__('document_file_placeholder')
  },

  isSubmitting: function () {
    return Session.get('documents.submitting')
  }
})

AutoForm.addHooks('newDocumentForm', {
  before: {
    method: function (doc) {
      Session.set('documents.submitting', true)

      return _.extend(doc, { _id: Random.id() })
    }
  },

  after: {
    method: function (error, result) {
      Session.set('documents.submitting')

      if (! error) Router.go('document', result)
    }
  }
})

AutoForm.addHooks('newDocumentForm', {
  before: {
    method: CfsAutoForm.Hooks.beforeInsert
  },

  after: {
    method: CfsAutoForm.Hooks.afterInsert
  }
})
