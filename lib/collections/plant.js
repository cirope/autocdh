Plants = new Ground.Collection(new Mongo.Collection('plants'), { version: 1.0 })

Plants.attachSchema(Schemas.Plant)

Plants.allow({
  remove: ownsDocument
})

Meteor.methods({
  createPlant: function (doc) {
    doc.userId = this.userId

    Plants.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var routeName = Router.current() && Router.current().route.getName()

        routeName === 'samplePlantNew' ?
          Router.go('sampleNew') : Router.go('plant', doc)
      }, 100)

      setTimeout(function () {
        $('[name="plantId"]').val(doc._id)
      }, 200)
    }
  },

  updatePlant: function (insertDoc, updateDoc, currentDoc) {
    Plants.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('plant', { _id: currentDoc })
      }, 100)
  }
})
