Strengths = new GroundDB(new Mongo.Collection('strengths'), { version: 1.0 })

Strengths.attachSchema(Schemas.Strength)

Strengths.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})
