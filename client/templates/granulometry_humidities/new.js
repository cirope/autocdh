AutoForm.addHooks('newGranulometryHumidityForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
