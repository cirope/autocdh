Maintenances = new Mongo.Collection('maintenances')

Maintenances.attachSchema(Schemas.Maintenance)

Meteor.methods({
  createMaintenance: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Maintenances.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('maintenance', doc)
      })
  },

  updateMaintenance: function (modifier, documentId) {
    Maintenances.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('maintenance', { _id: documentId })
      })
  }
})
