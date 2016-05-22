ProvidedCracks = new Ground.Collection(new Mongo.Collection('provided_cracks'), { version: 1.0 })

ProvidedCracks.attachSchema(Schemas.ProvidedCrack)

ProvidedCracks.allow({
  remove: ownsDocument
})

ProvidedCracks.setQuantity = function (quantity) {
  var schema = Schemas.ProvidedCrack.schema()

  schema.tubes.minCount = schema.tubes.maxCount = quantity
}

Meteor.methods({
  createProvidedCrack: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    ProvidedCracks.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('providedCrack', doc)
      })
  },

  updateProvidedCrack: function (modifier, documentId) {
    ProvidedCracks.update(documentId, modifier)

    if (this.isSimulation)
      Router.go('providedCrack', { _id: documentId })
  },

  removeProvidedCrack: function (documentId) {
    ProvidedCracks.remove(documentId)
  }
})
