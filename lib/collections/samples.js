Samples = new GroundDB(new Mongo.Collection('samples'), { version: 1.0 })

Samples.attachSchema(Schemas.Sample)

Samples.allow({
  remove: ownsDocument
})

Meteor.methods({
  createSample: function (doc) {
    doc.userId = this.userId

    Samples.insert(doc)

    if (this.isSimulation) Router.go('sample', doc)
  },

  updateSample: function (insertDoc, updateDoc, currentDoc) {
    Samples.update(currentDoc, updateDoc)

    if (this.isSimulation)
      Router.go('sample', { _id: currentDoc })
  }
})