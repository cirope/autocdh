Materials = new Ground.Collection(new Mongo.Collection('materials'), { version: 1.0 })

Materials.attachSchema(Schemas.Material)

Materials.allow({
  remove: ownsDocument
})

Materials.first = function () {
  return Materials.findOne({ userId: Meteor.userId() })
}

Meteor.methods({
  createMaterial: function (doc) {
    doc.userId = this.userId

    Materials.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('material', doc)
      }, 100)
  },

  updateMaterial: function (modifier, documentId) {
    Materials.update(documentId, modifier)

    if (this.isSimulation)
      Router.go('material', { _id: documentId })
  }
})
