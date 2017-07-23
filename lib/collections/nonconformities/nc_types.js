NcTypes = new Mongo.Collection('nc_types')

NcTypes.attachSchema(Schemas.NcType)

NcTypes.allow({
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createNcType: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    NcTypes.insert(doc, function () {})

    if (this.isSimulation) {
      setTimeout(function () {
        Router.go('nctype', doc)
      })

      setTimeout(function () {
        $('#nctype-search').val(doc.name)
        $('[name="nctypeId"]').val(doc._id).trigger('change')
      }, 100)
    }
  },

  createNcTypeFromNonconformity: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    NcTypes.insert(doc, function () {})

    if (this.isSimulation) {
      setTimeout(function () {
        Router.go('nonconformityNew')
      })
    }
  },

  updateNcType: function (modifier, documentId) {
    NcTypes.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('nctype', { _id: documentId })
      })
  }
})
