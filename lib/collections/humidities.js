Humidities = new GroundDB(new Mongo.Collection('humidities'), { version: 1.0 })

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

  updateHumidity: function (insertDoc, updateDoc, currentDoc) {
    var doc = Humidities.findOne(currentDoc)

    Humidities.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('assayNew', { sample_id: doc.sampleId })
      }, 100)
  }
})
