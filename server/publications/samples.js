Meteor.publish('samples', function () {
  return Samples.find({ userId: this.userId })
})
