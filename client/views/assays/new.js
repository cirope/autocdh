AutoForm.addHooks('newAssayForm', {
  before: {
    createAssay: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
