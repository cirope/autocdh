Meteor.publish('requests', function () {
  return Requests.find({ userId: this.userId })
})
