AutoForm.addHooks('newMaintenanceForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
