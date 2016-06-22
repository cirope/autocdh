Mixtures = new Ground.Collection(new Mongo.Collection('mixtures'), { version: 1.0 })

Mixtures.attachSchema(Schemas.Mixture)

Meteor.methods({
  createMixture: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Mixtures.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('mixture', doc)
      }, 100)
  },

  removeMixture: function (documentId) {
    Mixtures.remove(documentId)
  }
})
