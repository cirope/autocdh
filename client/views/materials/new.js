AutoForm.addHooks('newMaterialForm', {
  before: {
    createMaterial: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
