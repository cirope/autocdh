Meteor.publish('plants', function () {
  return publish.call(this, Plants)
})
