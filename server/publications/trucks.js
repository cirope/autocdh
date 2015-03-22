Meteor.publish('trucks', function () {
  return publish.call(this, Trucks)
})
