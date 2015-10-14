Settings = new Ground.Collection(new Mongo.Collection('settings'), { version: 1.0 })

Settings.attachSchema(Schemas.Setting)

Settings.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createSetting: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Settings.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('setting', doc)
      })
  },

  updateSetting: function (modifier, documentId) {
    Settings.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('setting', { _id: documentId })
      })
  }
})
