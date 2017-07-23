Origins = new Mongo.Collection('origins')

Origins.attachSchema(Schemas.Origin)

Origins.allow({
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createOrigin: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Origins.insert(doc, function () {})

    if (this.isSimulation) {
      setTimeout(function () {
        Router.go('origin', doc)
      })

      setTimeout(function () {
        $('#origin-search').val(doc.name)
        $('[name="originId"]').val(doc._id).trigger('change')
      }, 100)
    }
  },

  createOriginFromNonconformity: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Origins.insert(doc, function () {})

    if (this.isSimulation) {
      setTimeout(function () {
        Router.go('nonconformityNew')
      })
    }
  },

  updateOrigin: function (modifier, documentId) {
    Origins.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('origin', { _id: documentId })
      })
  }
})
