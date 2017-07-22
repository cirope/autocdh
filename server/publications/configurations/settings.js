Meteor.publish('settings', function () {
  return publish.call(this, Settings)
})
