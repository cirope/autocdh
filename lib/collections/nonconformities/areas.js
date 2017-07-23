Areas = new Mongo.Collection('areas')

Areas.attachSchema(Schemas.Area)

Areas.allow({
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createArea: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Areas.insert(doc, function () {})

    if (this.isSimulation) {
      setTimeout(function () {
        Router.go('area', doc)
      })

      setTimeout(function () {
        $('#area-search').val(doc.name)
        $('[name="areaId"]').val(doc._id).trigger('change')
      }, 100)
    }
  },

  createAreaFromNonconformity: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Areas.insert(doc, function () {})

    if (this.isSimulation) {
      setTimeout(function () {
        Router.go('nonconformityNew')
      })
    }
  },

  updateArea: function (modifier, documentId) {
    Areas.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('area', { _id: documentId })
      })
  }
})
