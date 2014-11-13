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
        Router.go('humidity', doc)
      }, 100)
  },

  updateHumidity: function (insertDoc, updateDoc, currentDoc) {
    Humidities.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('humidity', { _id: currentDoc })
      }, 100)
  }
})
