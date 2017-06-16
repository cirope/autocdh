Receipts = new Mongo.Collection('receipts')

Receipts.attachSchema(Schemas.Receipt)

Receipts.allow({
  remove: ownsDocument
})

Meteor.methods({
  createReceipt: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Receipts.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('concreteNew', { sample_id: doc.sampleId })
      })
  },

  updateReceipt: function (modifier, documentId) {
    var doc = Receipts.findOne(documentId)

    Receipts.update(documentId, modifier)

    if (this.isSimulation)
      Router.go('concreteNew', { sample_id: doc.sampleId })
  }
})
