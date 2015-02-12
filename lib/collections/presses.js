Presses = new Ground.Collection(new Mongo.Collection('presses'), { version: 1.0 })

Presses.attachSchema(Schemas.Press)

Presses.allow({
  remove: ownsDocument
})

Presses.first = function () {
  return Presses.findOne({ userId: Meteor.userId() })
}

Meteor.methods({
  createPress: function (doc) {
    doc.userId = this.userId

    Presses.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('press', doc)
      }, 100)
  },

  updatePress: function (insertDoc, updateDoc, currentDoc) {
    Presses.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('press', { _id: currentDoc })
      }, 100)
  }
})
