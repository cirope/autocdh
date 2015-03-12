Customers = new Ground.Collection(new Mongo.Collection('customers'), { version: 1.0 })

Customers.attachSchema(Schemas.Customer)

Customers.allow({
  remove: ownsDocument
})

Meteor.methods({
  createCustomer: function (doc) {
    doc.userId = this.userId

    Customers.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        params && params.sample_id ?
          Router.go('receiptNew', { sample_id: params && params.sample_id }) :
          Router.go('customer', doc)
      })

      setTimeout(function () {
        $('#customer-search').val(doc.name)
        $('[name="customerId"]').val(doc._id).trigger('change')
      }, 100)
    }
  },

  updateCustomer: function (modifier, documentId) {
    Customers.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('customer', { _id: documentId })
      })
  }
})
