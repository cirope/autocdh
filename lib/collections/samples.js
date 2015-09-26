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
    var previousDate = Samples.findOne(documentId).date

    Samples.update(documentId, modifier)

    Meteor.call('updateCracksDate', documentId, previousDate)

    if (this.isSimulation)
      Router.go('receiptNew', { sample_id: documentId })
  },

  removeSample: function (documentId) {
    var selector = { sampleId: documentId }

    Samples.remove(documentId)

    remove(Receipts,   selector)
    remove(Concretes,  selector)
    remove(Humidities, selector)
    remove(Assays,     selector)
    remove(Cracks,     selector)
  }
})
