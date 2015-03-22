Presses = new Ground.Collection(new Mongo.Collection('presses'), { version: 1.0 })

Presses.attachSchema(Schemas.Press)

Presses.allow({
  remove: ownsDocument
})

Meteor.methods({
  createPress: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Presses.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        params && params.crack_id ?
          Router.go('crackEdit', { _id: params.crack_id }) :
          Router.go('press', doc)
      })

      setTimeout(function () {
        $('[name="pressId"]').val(doc._id).trigger('change')
      }, 100)
    }
  },

  updatePress: function (modifier, documentId) {
    Presses.update(documentId, modifier)

    if (this.isSimulation)
      Router.go('press', { _id: documentId })
  }
})
