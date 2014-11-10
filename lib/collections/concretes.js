Concretes = new GroundDB(new Mongo.Collection('concretes'), { version: 1.0 })

Concretes.attachSchema(Schemas.Concrete)

Concretes.allow({
  remove: ownsDocument
})

Meteor.methods({
  createConcrete: function (doc) {
    doc.userId = this.userId

    Concretes.insert(doc, function () {})

    if (this.isSimulation)
      Router.go('humidityNew', { sample_id: doc.sampleId })
  },

  updateConcrete: function (insertDoc, updateDoc, currentDoc) {
    var doc = Concretes.findOne(currentDoc)

    Concretes.update(currentDoc, updateDoc)

    if (this.isSimulation)
      Router.go('humidityNew', { sample_id: doc.sampleId })
  }
})
