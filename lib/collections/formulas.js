Formulas = new Ground.Collection(new Mongo.Collection('formulas'), { version: 1.0 })

Formulas.attachSchema(Schemas.Formula)

Formulas.allow({
  remove: ownsDocument
})

Meteor.methods({
  createFormula: function (doc) {
    doc.userId = this.userId

    Formulas.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        var params = Router.current() && Router.current().params
        var query  = { query: { formula_id: doc._id } }

        params && params.sample_id ?
          Router.go('concreteNew', { sample_id: params && params.sample_id }, query) :
          Router.go('formula', doc)
      })
  },

  updateFormula: function (modifier, documentId) {
    Formulas.update(documentId, modifier)

    if (this.isSimulation)
      Router.go('formula', { _id: documentId })
  }
})
