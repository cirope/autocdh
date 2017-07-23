Meteor.publish('areas', function () {
  return publish.call(this, Areas)
})
