Receipts = new GroundDB(new Mongo.Collection('receipts'), { version: 1.0 })

Receipts.attachSchema(Schemas.Receipt)

Receipts.allow({
  remove: ownsDocument
})

Meteor.methods({
  createReceipt: function (doc) {
    doc.userId = this.userId

    Receipts.insert(doc)

    if (this.isSimulation) Router.go('receipt', doc)
  },

  updateReceipt: function (insertDoc, updateDoc, currentDoc) {
    console.log('lala')
    Receipts.update(currentDoc, updateDoc)

    if (this.isSimulation)
      Router.go('receipt', { _id: currentDoc })
  }
})
