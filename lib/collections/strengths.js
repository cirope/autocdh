Strengths = new Ground.Collection(new Mongo.Collection('strengths'), { version: 1.0 })

Strengths.attachSchema(Schemas.Strength)

Strengths.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createStrength: function (doc) {
    doc.userId = this.userId

    Strengths.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        Router.go('concreteNew', { sample_id: params && params.sample_id })
      }, 100)

      setTimeout(function () {
        $('[name="strengthId"]').val(doc._id)
      }, 200)
    }
  }
})
