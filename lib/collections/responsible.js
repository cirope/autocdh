Responsible = new Ground.Collection(new Mongo.Collection('responsible'), { version: 1.0 })

Responsible.attachSchema(Schemas.Responsible)

Responsible.allow({
  remove: ownsDocument
})

Meteor.methods({
  createResponsible: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Responsible.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var routeName = Router.current() && Router.current().route.getName()

        routeName === 'sampleResponsibleNew' ?
          Router.go('sampleNew') : Router.go('responsible', doc)
      })

      setTimeout(function () {
        $('[name="responsibleId"]').val(doc._id)
      }, 100)
    }
  },

  updateResponsible: function (modifier, documentId) {
    Responsible.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('responsible', { _id: documentId })
      })
  },

  removeResponsible: function (documentId) {
    var samplesCount        = Samples.find({ responsibleId: this._id }).count()
    var cracksCount         = Cracks.find({ responsibleId: this._id }).count()
    var granulometriesCount = Granulometries.find({ responsibleId: this._id }).count()

    if (samplesCount + cracksCount + granulometriesCount === 0)
      Responsible.remove(documentId)
  }
})
