Assays = new Ground.Collection(new Mongo.Collection('assays'), { version: 1.0 })

Assays.attachSchema(Schemas.Assay)

Assays.allow({
  remove: ownsDocument
})

Meteor.methods({
  createAssay: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Assays.insert(doc)
    Meteor.call('createCracks', doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('sample', { _id: doc.sampleId })
      })
  },

  updateAssay: function (modifier, documentId) {
    Assays.update(documentId, modifier)

    var assay = Assays.findOne(documentId)

    Meteor.call('updateCracks', assay)

    if (this.isSimulation)
      Router.go('sample', { _id: assay.sampleId })
  }
})
