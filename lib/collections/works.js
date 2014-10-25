Works = new GroundDB(new Mongo.Collection('works'), { version: 1.0 })

Works.attachSchema(Schemas.Work)

Works.allow({
  remove: ownsDocument
})

Meteor.methods({
  createWork: function (doc) {
    doc.userId = this.userId

    Works.insert(doc)
  },

  updateWork: function (insertDoc, updateDoc, currentDoc) {
    Works.update(currentDoc, updateDoc)
  }
})
