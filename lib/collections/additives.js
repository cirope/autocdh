Additives = new Ground.Collection(new Mongo.Collection('additives'), { version: 1.0 })

Additives.attachSchema(Schemas.Additive)

Additives.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createAdditive: function (doc) {
    doc.userId = this.userId

    Additives.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        params && params.sample_id ?
          Router.go('concreteNew', { sample_id: params && params.sample_id }) :
          Router.go('additive', doc)
      }, 100)

      setTimeout(function () {
        $('[name="additiveId"]').val(doc._id)
      }, 200)
    }
  },

  updateAdditive: function (insertDoc, updateDoc, currentDoc) {
    Additives.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('additive', { _id: currentDoc })
      }, 100)
  }
})
