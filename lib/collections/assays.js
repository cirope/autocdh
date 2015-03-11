Assays = new Ground.Collection(new Mongo.Collection('assays'), { version: 1.0 })

Assays.attachSchema(Schemas.Assay)

Assays.allow({
  remove: ownsDocument
})

Meteor.methods({
  createAssay: function (doc) {
    doc.userId = this.userId

    Assays.insert(doc)
    Meteor.call('createCracks', doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('sample', { _id: doc.sampleId })
      }, 100)
  },

  updateAssay: function (modifier, documentId) {
    var assay = Assays.findOne(documentId)

    Assays.update(documentId, modifier)

    if (this.isSimulation)
      Router.go('sample', { _id: assay.sampleId })
  }
})
