
var _management_documents_submitting = new ReactiveVar(false)

Template.managementDocumentNew.onDestroyed(function () {
  _management_documents_submitting.set(false)
})

Template.managementDocumentNew.helpers({
  filePlaceholder: function () {
    return TAPi18n.__('management_document_file_placeholder')
  },

  isSubmitting: function () {
    return _management_documents_submitting.get()
  }
})

AutoForm.addHooks('newManagementDocumentForm', {
  before: {
    method: function (doc) {
      _management_documents_submitting.set(true)

      return _.extend(doc, { _id: Random.id() })
    }
  },

  after: {
    method: function (error, result) {
      if (! error){
        Router.go('managementDocument', result)
      } else {
        _management_documents_submitting.set(false)
      }
    }
  },

  beginSubmit:  function(){
    _management_documents_submitting.set(true)
  },

  endSubmit:  function(){
    _management_documents_submitting.set(false)
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
