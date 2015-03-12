Samples = new Ground.Collection(new Mongo.Collection('samples'), { version: 1.0 })

Samples.attachSchema(Schemas.Sample)

Samples.allow({
  remove: ownsDocument
})

Meteor.methods({
  createSample: function (doc) {
    doc.userId = this.userId

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
  }
})
