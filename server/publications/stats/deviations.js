Meteor.publish('deviations', function () {
  return publish.call(this, Deviations)
})
