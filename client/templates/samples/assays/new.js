Template.assayNew.events({
  'change [name="tubes"]': function (event) {
    var tubes = $(event.currentTarget).val()
  }
})

AutoForm.addHooks('newAssayForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
