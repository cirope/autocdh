Meteor.publish('strengths', function () {
  return Strengths.find({ userId: this.userId })
})
