Meteor.publish('documents', function () {
  return publish.call(this, Documents)
})
