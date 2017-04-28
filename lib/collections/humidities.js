Humidities = new Mongo.Collection('humidities')

Humidities.attachSchema(Schemas.Humidity)

Humidities.allow({
  remove: ownsDocument
})

Meteor.methods({
  createHumidity: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Humidities.insert(doc, function () {})

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('assayNew', { sample_id: doc.sampleId })
      })
  },

  updateHumidity: function (modifier, documentId) {
    var doc = Humidities.findOne(documentId)

    Humidities.update(documentId, modifier)

    if (this.isSimulation)
      Router.go('assayNew', { sample_id: doc.sampleId })
  }
})
