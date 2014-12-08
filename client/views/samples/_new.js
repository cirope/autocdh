AutoForm.addHooks('newSampleForm', {
  before: {
    createSample: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
