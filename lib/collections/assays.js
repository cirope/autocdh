Assays = new Mongo.Collection('assays')

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
    var previousTubes = Assays.findOne(documentId).tubes

    Assays.update(documentId, modifier)

    var assay = Assays.findOne(documentId)

    Meteor.call('updateCracks', assay, previousTubes)

    if (this.isSimulation)
      Router.go('sample', { _id: assay.sampleId })
  },

  createCracksOnEmptyAssays: function () {
    Assays.find().forEach(function (assay) {
      var count = Cracks.find({ sampleId: assay.sampleId }).count()

      if (! count) Meteor.call('createCracks', assay)
    })
  }
})
