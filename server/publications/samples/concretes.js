Meteor.publish('concretes', function () {
  return publish.call(this, Concretes)
})
