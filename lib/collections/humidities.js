Humidities = new Ground.Collection(new Mongo.Collection('humidities'), { version: 1.0 })

Humidities.attachSchema(Schemas.Humidity)

Humidities.allow({
  remove: ownsDocument
})

Meteor.methods({
  createHumidity: function (doc) {
    doc.userId = this.userId

    Humidities.insert(doc, function () {})

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('assayNew', { sample_id: doc.sampleId })
      }, 100)
  },

  updateHumidity: function (modifier, documentId) {
    var doc = Humidities.findOne(documentId)

    Humidities.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('assayNew', { sample_id: doc.sampleId })
      }, 100)
  }
})
