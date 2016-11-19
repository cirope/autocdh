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
  },

  updateDigitalSignature: function (modifier, documentId) {
    Settings.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('digitalSignature', { _id: documentId })
      })
  },

  updateCustomOptions: function (modifier, documentId) {
    Settings.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('customOptions', { _id: documentId })
      })
  },

  updateSettingValue: function (operation, id, selector) {
    var updateSelector = _.extend(selector, { _id: id })
    var result         = null

    try {
      result = Settings.update(updateSelector, operation.modifier)

      if (! result)
        result = Settings.update(id, operation.aggregation)
    } catch (e) {
      throw new Meteor.Error('invalid-setting', 'Invalid setting value')
    }


    return result
  }
})
