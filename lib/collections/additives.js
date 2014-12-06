Additives = new Ground.Collection(new Mongo.Collection('additives'), { version: 1.0 })

Additives.attachSchema(Schemas.Additive)

Additives.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})
