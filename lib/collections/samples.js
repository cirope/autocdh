Samples = new Ground.Collection(new Mongo.Collection('samples'), { version: 1.0 })

Samples.attachSchema(Schemas.Sample)

Samples.allow({
  remove: ownsDocument
})

var remove = function (collection, selector) {
  collection.find(selector).forEach(function (obj) {
    collection.remove(obj._id)
  })
}

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

    remove(Cracks,     selector)
    remove(Assays,     selector)
    remove(Humidities, selector)
    remove(Concretes,  selector)
    remove(Receipts,   selector)

    Samples.remove(documentId)

    if (this.isSimulation) Router.go('samples')
  }
})
