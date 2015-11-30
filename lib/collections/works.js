Works = new Ground.Collection(new Mongo.Collection('works'), { version: 1.0 })

Works.attachSchema(Schemas.Work)

Works.allow({
  remove: ownsDocument
})

Meteor.methods({
  createWork: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Works.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        params && params.sample_id ?
          Router.go('receiptNew', { sample_id: params && params.sample_id }) :
          Router.go('work', doc)
      })

      setTimeout(function () {
        $('#work-search').val(doc.name)
        $('[name="workId"]').val(doc._id).trigger('change')
      }, 100)
    }
  },

  updateWork: function (modifier, documentId) {
    Works.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('work', { _id: documentId })
      })
  },

  removeWork: function (documentId) {
    var hasReceipts = Receipts.find({ workId: documentId }).count()

    if (! hasReceipts) Works.remove(documentId)
  }
})
