Meteor.publish('origins', function () {
  return publish.call(this, Areas)
})
