Meteor.publish('aggregates', function () {
  return publish.call(this, Aggregates)
})
