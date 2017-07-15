
var onDestroyed = function () {
}

var helpers = {
  revisionValue: function () {
    return TAPi18n.__('management_document_revision_' + this.revision)
  },

  typeValue: function () {
    return TAPi18n.__('management_document_type_' + this.type)
  },

  categoryValue: function () {
    return TAPi18n.__('management_document_category_' + this.category)
  },

  file: function () {
    return Files.findOne(this.fileId)
  }
}

var events = {
}

Template.managementDocumentNew.onDestroyed(onDestroyed)
Template.managementDocumentEdit.onDestroyed(onDestroyed)

Template.managementDocument.helpers(helpers)
Template.managementDocumentNew.helpers(helpers)
Template.managementDocumentEdit.helpers(helpers)
Template.managementDocumentsList.helpers(helpers)
Template.managementDocumentsEmpty.helpers(helpers)

Template.managementDocumentNew.events(events)
Template.managementDocumentEdit.events(events)
