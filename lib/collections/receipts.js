Receipts = new Ground.Collection(new Mongo.Collection('receipts'), { version: 1.0 })

Receipts.attachSchema(Schemas.Receipt)

Receipts.allow({
  remove: ownsDocument
})

Meteor.methods({
  createReceipt: function (doc) {
    doc.userId = this.userId

    Receipts.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('concreteNew', { sample_id: doc.sampleId })
      }, 100)
  },

  updateReceipt: function (insertDoc, updateDoc, currentDoc) {
    var doc = Receipts.findOne(currentDoc)

    Receipts.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('concreteNew', { sample_id: doc.sampleId })
      }, 100)
  }
})