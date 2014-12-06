Assays = new Ground.Collection(new Mongo.Collection('assays'), { version: 1.0 })

Assays.attachSchema(Schemas.Assay)

Assays.allow({
  remove: ownsDocument
})

Meteor.methods({
  createAssay: function (doc) {
    doc.userId = this.userId

    Assays.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('assay', doc)
      }, 100)
  },

  updateAssay: function (insertDoc, updateDoc, currentDoc) {
    Assays.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('assay', { _id: currentDoc })
      }, 100)
  }
})
