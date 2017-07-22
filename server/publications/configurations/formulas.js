Meteor.publish('formulas', function () {
  return publish.call(this, Formulas)
})
