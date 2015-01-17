Aggregates = new Ground.Collection(new Mongo.Collection('aggregates'), { version: 1.0 })

Aggregates.attachSchema(Schemas.Aggregate)

Aggregates.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createAggregate: function (doc) {
    doc.userId = this.userId

    Aggregates.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        params && params.sample_id ?
          Router.go('concreteNew', { sample_id: params && params.sample_id }) :
          Router.go('formulaNew')
      }, 100)

      setTimeout(function () {
        $('[name="aggregateId"]').val(doc._id)
      }, 200)
    }
  }
})
