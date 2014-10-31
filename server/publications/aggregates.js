Meteor.publish('aggregates', function () {
  return Aggregates.find({ userId: this.userId })
})
