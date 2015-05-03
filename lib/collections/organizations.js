Organizations = new Ground.Collection(new Mongo.Collection('organizations'), { version: 1.0 })

Organizations.attachSchema(Schemas.Organization)

Organizations.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createOrganization: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Organizations.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('organization', doc)
      })
  },

  updateOrganization: function (modifier, documentId) {
    Organizations.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('organization', { _id: documentId })
      })
  },

  removeOrganization: function (documentId) {
    var organization = Organizations.findOne(documentId)

    Images.remove(organization.imageId)
    Organizations.remove(documentId)
  }
})
