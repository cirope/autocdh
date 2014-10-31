Settlements = new GroundDB(new Mongo.Collection('settlements'), { version: 1.0 })

Settlements.attachSchema(Schemas.Settlement)

Settlements.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})
