AutoForm.addHooks('newLimitForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})

Template.limitNew.helpers({
})

Template.limitNew.events({
})
