Meteor.publish('plants', function () {
  return Plants.find({ userId: this.userId })
})
