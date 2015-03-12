Responsible = new Ground.Collection(new Mongo.Collection('responsible'), { version: 1.0 })

Responsible.attachSchema(Schemas.Responsible)

Responsible.allow({
  remove: ownsDocument
})

Meteor.methods({
  createResponsible: function (doc) {
    doc.userId = this.userId

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
  }
})
