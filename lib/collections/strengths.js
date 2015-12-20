Strengths = new Ground.Collection(new Mongo.Collection('strengths'), { version: 1.0 })

Strengths.attachSchema(Schemas.Strength)

Strengths.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createStrength: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Strengths.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        params && params.sample_id ?
          Router.go('concreteFormulaNew', { sample_id: params && params.sample_id }) :
          Router.go('formulaNew')
      })

      setTimeout(function () {
        $('[name="strengthId"]').val(doc._id)
      }, 100)
    }
  },

  updateStrength: function (modifier, documentId) {
    Strengths.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('strength', { _id: documentId })
      })
  },

  removeStrength: function (documentId) {
    var concretesCount = Concretes.find({ strengthId: this._id }).count()
    var formulasCount  = Formulas.find({ strengthId: this._id }).count()

    if (concretesCount + formulasCount === 0) Strengths.remove(documentId)
  },

  updateStrengthCriteria: function (modifier, documentId) {
    Strengths.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('criteria', { _id: documentId })
      })
  }
})
