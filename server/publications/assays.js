Meteor.publish('assays', function () {
  return Assays.find({ userId: this.userId })
})
