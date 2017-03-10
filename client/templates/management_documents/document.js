var deactivating = new ReactiveVar

Template.managementDocument.helpers({
  revision: function () {
    return TAPi18n.__('management_document_revision_' + this.revision)
  },

  type: function () {
    return TAPi18n.__('management_document_type_' + this.type)
  },

  category: function () {
    return TAPi18n.__('management_document_category_' + this.category)
  },

  deactivating: function () {
    return deactivating.get()
  }
})

Template.managementDocument.onDestroyed(function () {
  deactivating.set()
})

Template.managementDocument.events({

  'click [data-deactivate]': function (event, template) {
    deactivating.set(true)
  },

  'click [data-cancel="deactivating"]': function (event, template) {
    event.preventDefault()
    deactivating.set()
  }
})

AutoForm.addHooks('deactivateManagementDocumentForm', {
  before: {
    'method-update': function (doc, b) {
      if (confirm(TAPi18n.__('confirm_delete'))) {
        delete doc.$unset

        return {
          $set: _.extend(doc.$set, { active: false })
        }
      } else {
        return false
      }
    }
  }
})
