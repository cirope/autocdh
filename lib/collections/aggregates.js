Aggregates = new Ground.Collection(new Mongo.Collection('aggregates'), { version: 1.0 })

Aggregates.attachSchema(Schemas.Aggregate)

Aggregates.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createAggregate: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Aggregates.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        params && params.sample_id ?
          Router.go('concreteFormulaNew', { sample_id: params && params.sample_id }) :
          Router.go('formulaNew')
      })

      setTimeout(function () {
        $('[name="aggregateId"]').val(doc._id)
      }, 100)
    }
  },

  updateAggregate: function (modifier, documentId) {
    Aggregates.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('aggregate', { _id: documentId })
      })
  },

  removeAggregate: function (documentId) {
    var concretesCount = Concretes.find({ aggregateId: this._id }).count()
    var formulasCount  = Formulas.find({ aggregateId: this._id }).count()

    if (concretesCount + formulasCount === 0) Aggregates.remove(documentId)
  }
})
