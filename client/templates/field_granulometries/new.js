AutoForm.addHooks('newFieldGranulometryForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})

Template.fieldGranulometryNew.helpers({
})

Template.fieldGranulometryNew.events({
})
