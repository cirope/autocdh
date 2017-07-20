Additives = new Mongo.Collection('additives')

Additives.attachSchema(Schemas.Additive)

Additives.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createAdditive: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Additives.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        params && params.sample_id ?
          Router.go('concreteNew', { sample_id: params && params.sample_id }) :
          Router.go('additive', doc)
      })

      setTimeout(function () {
        $('[name="additiveId"]').val(doc._id)
      }, 100)
    }
  },

  updateAdditive: function (modifier, documentId) {
    Additives.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('additive', { _id: documentId })
      })
  },

  removeAdditive: function (documentId) {
    var hasConcretes = Concretes.find({ additiveId: documentId }).count()

    if (! hasConcretes) Additives.remove(documentId)
  }
})
