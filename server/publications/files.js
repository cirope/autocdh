Meteor.publish('files', function () {
  return publish.call(this, Files)
})
