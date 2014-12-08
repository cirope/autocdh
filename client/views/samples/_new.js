AutoForm.addHooks('newSampleForm', {
  before: {
    createSample: function (doc, template) {
      doc._id = Random.id()

      return doc
    }
  }
})
