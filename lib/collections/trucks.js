Trucks = new GroundDB(new Mongo.Collection('trucks'), { version: 1.0 })

Trucks.attachSchema(Schemas.Truck)

Trucks.allow({
  remove: ownsDocument
})

Meteor.methods({
  createTruck: function (doc) {
    doc.userId = this.userId

    Trucks.insert(doc)

    if (this.isSimulation) Router.go('truck', doc)
  },

  updateTruck: function (insertDoc, updateDoc, currentDoc) {
    Trucks.update(currentDoc, updateDoc)

    if (this.isSimulation)
      Router.go('truck', { _id: currentDoc })
  }
})
