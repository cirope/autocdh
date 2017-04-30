ManagementDocuments = new Mongo.Collection('managementDocuments')

ManagementDocuments.attachSchema(Schemas.ManagementDocument)

Meteor.methods({
  createManagementDocument: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    ManagementDocuments.insert(doc)

    if (doc.fileId)
      Files.update(doc.fileId, {
        $set: { organizationId: doc.organizationId }
      })

    return doc
  },

  updateManagementDocument: function (modifier, documentId) {
    ManagementDocuments.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('managementDocument', { _id: documentId })
      })
  },

  removeManagementDocument: function (documentId) {
    var doc = ManagementDocuments.findOne(documentId)

    Files.remove(doc.fileId)
    ManagementDocuments.remove(documentId)
  },

  updateManagementDocumentFile: function (fileId, documentId) {
    var doc = ManagementDocuments.findOne(documentId)

    if (doc.fileId)
      Files.remove(doc.fileId)

    ManagementDocuments.update(documentId, { $set: { fileId: fileId } })
  }
})
