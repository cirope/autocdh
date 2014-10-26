Customers = new GroundDB(new Mongo.Collection('customers'), { version: 1.0 })

Customers.attachSchema(Schemas.Customer)

Customers.allow({
  remove: ownsDocument
})

Meteor.methods({
  createCustomer: function (doc) {
    doc.userId = this.userId

    Customers.insert(doc)

    if (this.isSimulation) Router.go('customer', doc)
  },

  updateCustomer: function (insertDoc, updateDoc, currentDoc) {
    Customers.update(currentDoc, updateDoc)

    if (this.isSimulation)
      Router.go('customer', { _id: currentDoc })
  }
})
