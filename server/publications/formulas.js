Meteor.publish('formulas', function () {
  return Formulas.find({ userId: this.userId })
})
