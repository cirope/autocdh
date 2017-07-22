Meteor.publish('strengths', function () {
  return publish.call(this, Strengths)
})
