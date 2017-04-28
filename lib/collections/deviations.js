Deviations = new Mongo.Collection('deviations')

Deviations.attachSchema(Schemas.Deviation)

Deviations.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createDeviation: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Deviations.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('deviation', doc)
      })
  },

  updateDeviation: function (modifier, documentId) {
    Deviations.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('deviation', { _id: documentId })
      })
  }
})
