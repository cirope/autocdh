// TODO: remove when migration to collection-less downloads finish
Downloads = new Ground.Collection(new Mongo.Collection('downloads'), { version: 1.0 })

Downloads.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})
