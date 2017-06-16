Trucks = new Mongo.Collection('trucks')

Trucks.attachSchema(Schemas.Truck)

Trucks.allow({
  remove: ownsDocument
})

Meteor.methods({
  createTruck: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Trucks.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        params && params.sample_id ?
          Router.go('receiptNew', { sample_id: params && params.sample_id }) :
          Router.go('truck', doc)
      })

      setTimeout(function () {
        $('#truck-search').val(doc.number)
        $('[name="truckId"]').val(doc._id).trigger('change')
        $('[name="truckDriver"]').val(doc.driver).trigger('change')
      }, 100)
    }
  },

  updateTruck: function (modifier, documentId) {
    Trucks.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('truck', { _id: documentId })
      })
  },

  removeTruck: function (documentId) {
    var hasReceipts = Receipts.find({ truckId: documentId }).count()

    if (! hasReceipts) Trucks.remove(documentId)
  }
})
