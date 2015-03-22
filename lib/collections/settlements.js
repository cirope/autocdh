Settlements = new Ground.Collection(new Mongo.Collection('settlements'), { version: 1.0 })

Settlements.attachSchema(Schemas.Settlement)

Settlements.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createSettlement: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Settlements.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        params && params.sample_id ?
          Router.go('concreteFormulaNew', { sample_id: params && params.sample_id }) :
          Router.go('formulaNew')
      })

      setTimeout(function () {
        $('[name="settlementId"]').val(doc._id)
      }, 100)
    }
  },

  updateSettlement: function (modifier, documentId) {
    Settlements.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('settlement', { _id: documentId })
      })
  }
})
