Presses = new Ground.Collection(new Mongo.Collection('presses'), { version: 1.0 })

Presses.attachSchema(Schemas.Press)

Presses.allow({
  remove: ownsDocument
})

Presses.first = function () {
  return Presses.findOne({ userId: Meteor.userId() })
}

Meteor.methods({
  createPress: function (doc) {
    doc.userId = this.userId

    Presses.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        params && params.crack_id ?
          Router.go('crackEdit', { _id: params.crack_id }) :
          Router.go('press', doc)
      }, 100)

      setTimeout(function () {
        $('[name="pressId"]').val(doc._id).trigger('change')
      }, 200)
    }
  },

  updatePress: function (insertDoc, updateDoc, currentDoc) {
    Presses.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('press', { _id: currentDoc })
      }, 100)
  }
})
