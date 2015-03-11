Concretes = new Ground.Collection(new Mongo.Collection('concretes'), { version: 1.0 })

Concretes.attachSchema(Schemas.Concrete)

Concretes.allow({
  remove: ownsDocument
})

Meteor.methods({
  createConcrete: function (doc) {
    doc.userId = this.userId

    Concretes.insert(doc, function () {})

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('humidityNew', { sample_id: doc.sampleId })
      }, 100)
  },

  updateConcrete: function (modifier, documentId) {
    var doc = Concretes.findOne(documentId)

    Concretes.update(documentId, modifier)

    if (this.isSimulation)
      Router.go('humidityNew', { sample_id: doc.sampleId })
  }
})
