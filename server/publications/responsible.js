Meteor.publish('responsible', function () {
  return Responsible.find({ userId: this.userId })
})
