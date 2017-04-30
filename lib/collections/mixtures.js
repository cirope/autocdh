Mixtures = new Mongo.Collection('mixtures')

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

  updateMixture: function (modifier, documentId) {
    Mixtures.update(documentId, modifier)

    if (this.isSimulation)
      Router.go('mixture', { _id: documentId })
  },

  removeMixture: function (documentId) {
    Mixtures.remove(documentId)
  }
})
