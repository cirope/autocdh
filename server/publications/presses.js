Meteor.publish('presses', function () {
  return Presses.find({ userId: this.userId })
})
