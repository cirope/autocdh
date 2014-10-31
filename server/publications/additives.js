Meteor.publish('additives', function () {
  return Additives.find({ userId: this.userId })
})
