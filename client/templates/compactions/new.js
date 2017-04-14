AutoForm.addHooks('newCompactionForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})

Template.compactionNew.helpers({
})

Template.compactionNew.events({
})
