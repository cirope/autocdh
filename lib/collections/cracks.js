Cracks = new GroundDB(new Mongo.Collection('cracks'), { version: 1.0 })

Cracks.attachSchema(Schemas.Crack)

Cracks.allow({
  remove: ownsDocument
})

Meteor.methods({
  createCrack: function (doc) {
    doc.userId = this.userId

    Cracks.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('crack', doc)
      }, 100)
  },

  updateCrack: function (insertDoc, updateDoc, currentDoc) {
    Cracks.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('crack', { _id: currentDoc })
      }, 100)
  }
})
