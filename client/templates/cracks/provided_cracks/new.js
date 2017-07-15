AutoForm.addHooks('newProvidedCrackForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
