Plants = new GroundDB(new Mongo.Collection('plants'), { version: 1.0 })

Plants.attachSchema(Schemas.Plant)

Plants.allow({
  remove: ownsDocument
})

Meteor.methods({
  createPlant: function (doc) {
    doc.userId = this.userId

    Plants.insert(doc)

    if (this.isSimulation) Router.go('plant', doc)
  },

  updatePlant: function (insertDoc, updateDoc, currentDoc) {
    Plants.update(currentDoc, updateDoc)

    if (this.isSimulation)
      Router.go('plant', { _id: currentDoc })
  }
})
