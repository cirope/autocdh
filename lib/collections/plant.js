Plants = new Ground.Collection(new Mongo.Collection('plants'), { version: 1.0 })

Plants.attachSchema(Schemas.Plant)

Plants.allow({
  remove: ownsDocument
})

Meteor.methods({
  createPlant: function (doc) {
    doc.userId = this.userId

    Plants.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('plant', doc)
      }, 100)
  },

  updatePlant: function (insertDoc, updateDoc, currentDoc) {
    Plants.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('plant', { _id: currentDoc })
      }, 100)
  }
})
