Types = new Ground.Collection(new Mongo.Collection('types'), { version: 1.0 })

Types.attachSchema(Schemas.Type)

Types.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})
