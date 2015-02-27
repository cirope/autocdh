Granulometries = new Ground.Collection(new Mongo.Collection('granulometries'), { version: 1.0 })

Granulometries.attachSchema(Schemas.Granulometry)

Granulometries.allow({
  remove: ownsDocument
})

Meteor.methods({
  createGranulometry: function (doc) {
    doc.userId = this.userId

    Granulometries.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('granulometry', doc)
      }, 100)
  },

  updateGranulometry: function (insertDoc, updateDoc, currentDoc) {
    Granulometries.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('granulometry', { _id: currentDoc })
      }, 100)
  }
})
