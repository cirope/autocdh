Providers = new Mongo.Collection('providers')

Providers.attachSchema(Schemas.Provider)

Providers.allow({
  remove: ownsDocument
})

Meteor.methods({
  createProvider: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Providers.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        Router.go('provider', doc)
      })

      setTimeout(function () {
        $('#provider-search').val(doc.name)
        $('[name="providerId"]').val(doc._id).trigger('change')
      }, 100)
    }
  },

  updateProvider: function (modifier, documentId) {
    Providers.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('provider', { _id: documentId })
      })
  },

  removeProvider: function (documentId) {
    var hasGranulometries = Granulometries.find({ providerId: documentId }).count()

    if (! hasGranulometries) Providers.remove(documentId)
  }
})
