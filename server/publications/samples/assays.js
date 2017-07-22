Meteor.publish('assays', function () {
  return publish.call(this, Assays)
})
