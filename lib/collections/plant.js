Plants = new Mongo.Collection('plants')

Plants.attachSchema(Schemas.Plant)

Plants.allow({
  remove: ownsDocument
})

Meteor.methods({
  createPlant: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Plants.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var routeName = Router.current() && Router.current().route.getName()

        routeName === 'samplePlantNew' ?
          Router.go('sampleNew') : Router.go('plant', doc)
      })

      setTimeout(function () {
        $('[name="plantId"]').val(doc._id)
      }, 100)
    }
  },

  updatePlant: function (modifier, documentId) {
    Plants.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('plant', { _id: documentId })
      })
  },

  removePlant: function (documentId) {
    var samplesCount        = Samples.find({ plantId: this._id }).count()
    var granulometriesCount = Granulometries.find({ plantId: this._id }).count()

    if (samplesCount + granulometriesCount === 0) Plants.remove(documentId)
  }
})
