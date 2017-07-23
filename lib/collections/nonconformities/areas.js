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
        var params = Router.current() && Router.current().params

        params && params.nonconformity_id ?
          Router.go('nonconformityNew', { nonconformity_id: params && params.nonconformity_id }) :
          Router.go('areaNew', doc)
      })

      setTimeout(function () {
        $('#area-search').val(doc.name)
        $('[name="areaId"]').val(doc._id).trigger('change')
      }, 100)
    }
  },

  updateArea: function (modifier, documentId) {
    Areas.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('area', { _id: documentId })
      })
  },

  removeArea: function (documentId) {
    var nonconformitiesCount = Nonconformities.find({ areaId: this._id }).count()

    if (nonconformitiesCount === 0) Areas.remove(documentId)
  }
})
