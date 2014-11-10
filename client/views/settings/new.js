AutoForm.addHooks('newSettingForm', {
  before: {
    createSetting: function (doc, template) {
      doc._id = Random.id()

      return doc
    }
  }
})
