Works = new Ground.Collection(new Mongo.Collection('works'), { version: 1.0 })

Works.attachSchema(Schemas.Work)

Works.allow({
  remove: ownsDocument
})

Meteor.methods({
  createWork: function (doc) {
    doc.userId = this.userId

    Works.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('work', doc)
      }, 100)
  },

  updateWork: function (insertDoc, updateDoc, currentDoc) {
    Works.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('work', { _id: currentDoc })
      }, 100)
  }
})
