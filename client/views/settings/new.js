AutoForm.addHooks('newSettingForm', {
  before: {
    createSetting: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
