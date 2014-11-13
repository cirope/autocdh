Settings = new GroundDB(new Mongo.Collection('settings'), { version: 1.0 })

Settings.attachSchema(Schemas.Setting)

Settings.allow({
  remove: ownsDocument
})

Meteor.methods({
  createSetting: function (doc) {
    doc.userId    = this.userId
    doc.createdAt = new Date

    Settings.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('setting', doc)
      }, 100)
  },

  updateSetting: function (insertDoc, updateDoc, currentDoc) {
    Settings.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('setting', { _id: currentDoc })
      }, 100)
  }
})
