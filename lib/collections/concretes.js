Concretes = new GroundDB(new Mongo.Collection('concretes'), { version: 1.0 })

Concretes.attachSchema(Schemas.Concrete)

Concretes.allow({
  remove: ownsDocument
})

Meteor.methods({
  createConcrete: function (doc) {
    doc.userId = this.userId

    Concretes.insert(doc, function () {})

    if (this.isSimulation) Router.go('concrete', doc)
  },

  updateConcrete: function (insertDoc, updateDoc, currentDoc) {
    Concretes.update(currentDoc, updateDoc)

    if (this.isSimulation)
      Router.go('concrete', { _id: currentDoc })
  }
})
