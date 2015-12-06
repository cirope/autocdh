Containers = new Ground.Collection(new Mongo.Collection('containers'), { version: 1.0 })

Containers.attachSchema(Schemas.Container)

Containers.allow({
  remove: ownsDocument
})

Meteor.methods({
  createContainer: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Containers.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('container', doc)
      })
  },

  updateContainer: function (modifier, documentId) {
    Containers.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('container', { _id: documentId })
      })
  },

  removeContainer: function (documentId) {
    Containers.remove(documentId)
  }
})
