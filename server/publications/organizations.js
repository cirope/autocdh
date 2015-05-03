Meteor.publish('organizations', function () {
  return publish.call(this, Organizations)
})
