Meteor.publish('works', function () {
  return Works.find({ userId: this.userId })
})
