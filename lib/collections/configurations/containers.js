Containers = new Mongo.Collection('containers')

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
