Meteor.publish('settlements', function () {
  return Settlements.find({ userId: this.userId })
})
