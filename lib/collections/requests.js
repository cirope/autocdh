Requests = new GroundDB(new Mongo.Collection('requests'), { version: 1.0 })

Requests.attachSchema(Schemas.Request)

Requests.allow({
  remove: ownsDocument
})

Meteor.methods({
  createRequest: function (doc) {
    doc.userId = this.userId

    Requests.insert(doc)

    if (this.isSimulation) Router.go('request', doc)
  },

  updateRequest: function (insertDoc, updateDoc, currentDoc) {
    Requests.update(currentDoc, updateDoc)

    if (this.isSimulation)
      Router.go('request', { _id: currentDoc })
  }
})
