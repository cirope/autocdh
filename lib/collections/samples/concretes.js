Concretes = new Mongo.Collection('concretes')

Concretes.attachSchema(Schemas.Concrete)

Concretes.allow({
  remove: ownsDocument
})

Meteor.methods({
  createConcrete: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Concretes.insert(doc, function () {})

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('humidityNew', { sample_id: doc.sampleId })
      })
  },

  updateConcrete: function (modifier, documentId) {
    var doc = Concretes.findOne(documentId)

    Concretes.update(documentId, modifier)

    if (this.isSimulation)
      Router.go('humidityNew', { sample_id: doc.sampleId })
  }
})
