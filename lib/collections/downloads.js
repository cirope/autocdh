Downloads = new GroundDB(new Mongo.Collection('downloads'), { version: 1.0 })

Downloads.attachSchema(Schemas.Download)

Downloads.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})
