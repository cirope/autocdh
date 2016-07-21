Documents = new Ground.Collection(new Mongo.Collection('documents'), { version: 1.0 })

Documents.attachSchema(Schemas.Document)

Meteor.methods({
  createDocument: function (doc) {
    doc.organizationId = doc.type === 'protocols' &&
      organizationIdFor(this.userId) || 'all'

    Documents.insert(doc)

    if (doc.fileId)
      Files.update(doc.fileId, {
        $set: { organizationId: doc.organizationId }
      })

    return doc
  },

  updateDocument: function (modifier, documentId) {
    Documents.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('document', { _id: documentId })
      })
  },

  removeDocument: function (documentId) {
    var doc = Documents.findOne(documentId)

    Files.remove(doc.fileId)
    Documents.remove(documentId)
  },

  updateDocumentFile: function (fileId, documentId) {
    var document = Documents.findOne(documentId)

    if (document.fileId)
      Files.remove(document.fileId)

    Documents.update(documentId, { $set: { fileId: fileId } })
  }
})
