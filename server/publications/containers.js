Meteor.publish('containers', function () {
  return publish.call(this, Containers)
})
