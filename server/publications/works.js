Meteor.publish('works', function () {
  return publish.call(this, Works)
})
