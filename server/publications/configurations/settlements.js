Meteor.publish('settlements', function () {
  return publish.call(this, Settlements)
})
