Instruments = new Mongo.Collection('instruments')

Instruments.attachSchema(Schemas.Instrument)

Meteor.methods({
  createInstrument: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Instruments.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('instrument', doc)
      })
  },

  updateInstrument: function (modifier, documentId) {
    Instruments.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('instrument', { _id: documentId })
      })
  },

  removeInstrument: function (documentId) {
    var hasMaintenances = Maintenances.find({ instrumentId: documentId }).count()

    if (! hasMaintenances) Instruments.remove(documentId)
  }
})
