Meteor.publish('cracks', function () {
  return publish.call(this, Cracks)
})
