AutoForm.addHooks('newPressForm', {
  before: {
    createPress: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
