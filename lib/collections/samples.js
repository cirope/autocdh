Samples = new Ground.Collection(new Mongo.Collection('samples'), { version: 1.0 })

Samples.attachSchema(Schemas.Sample)

Samples.allow({
  remove: ownsDocument
})

Meteor.methods({
  createSample: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Samples.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('receiptNew', { sample_id: doc._id })
      })
  },

  updateSample: function (modifier, documentId) {
    Samples.update(documentId, modifier)

    if (this.isSimulation)
      Router.go('receiptNew', { sample_id: documentId })
  },

  removeSample: function (documentId) {
    var selector = { sampleId: documentId }

    Cracks.remove(selector)
    Assays.remove(selector)
    Humidities.remove(selector)
    Concretes.remove(selector)
    Receipts.remove(selector)

    Samples.remove(documentId)

    if (this.isSimulation) Router.go('samples')
  }
})
