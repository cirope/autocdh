Responsible = new GroundDB(new Mongo.Collection('responsibles'), { version: 1.0 })

Responsible.attachSchema(Schemas.Responsible)

Responsible.allow({
  remove: ownsDocument
})

Meteor.methods({
  createResponsible: function (doc) {
    doc.userId = this.userId

    Responsible.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('responsible', doc)
      }, 100)
  },

  updateResponsible: function (insertDoc, updateDoc, currentDoc) {
    Responsible.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('responsible', { _id: currentDoc })
      }, 100)
  }
})
