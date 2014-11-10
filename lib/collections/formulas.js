Formulas = new GroundDB(new Mongo.Collection('formulas'), { version: 1.0 })

Formulas.attachSchema(Schemas.Formula)

Formulas.allow({
  remove: ownsDocument
})

Meteor.methods({
  createFormula: function (doc) {
    doc.userId = this.userId

    Formulas.insert(doc, function () {})

    if (this.isSimulation) Router.go('formula', doc)
  },

  updateFormula: function (insertDoc, updateDoc, currentDoc) {
    Formulas.update(currentDoc, updateDoc)

    if (this.isSimulation)
      Router.go('formula', { _id: currentDoc })
  }
})
