AutoForm.addHooks('newGranulometryForm', {
  before: {
    createGranulometry: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
