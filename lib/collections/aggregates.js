Aggregates = new Ground.Collection(new Mongo.Collection('aggregates'), { version: 1.0 })

Aggregates.attachSchema(Schemas.Aggregate)

Aggregates.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})
