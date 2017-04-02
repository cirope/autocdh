
var _documents_submitting = new ReactiveVar(false)

Template.documentNew.onDestroyed(function () {
  _documents_submitting.set(false)
})

Template.documentNew.helpers({
  filePlaceholder: function () {
    return TAPi18n.__('document_file_placeholder')
  },

  isSubmitting: function () {
    return _documents_submitting.get()
  }
})

AutoForm.addHooks('newDocumentForm', {
  before: {
    method: function (doc) {
      _documents_submitting.set(true)

      return _.extend(doc, { _id: Random.id() })
    }
  },

  after: {
    method: function (error, result) {
      if (! error){
        Router.go('document', result)
      } else {
        _documents_submitting.set(false)
      }
    }
  },

  beginSubmit:  function(){
    _documents_submitting.set(true)
  },

  endSubmit:  function(){
    _documents_submitting.set(false)
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
