Meteor.publish('downloads', function () {
  return Downloads.find({ userId: this.userId })
})
