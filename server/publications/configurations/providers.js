Meteor.publish('providers', function () {
  return publish.call(this, Providers)
})
