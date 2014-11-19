Meteor.publish('cracks', function () {
  return Cracks.find({ userId: this.userId })
})
