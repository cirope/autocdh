Meteor.publish('additives', function () {
  return publish.call(this, Additives)
})
