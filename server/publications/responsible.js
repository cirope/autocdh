Meteor.publish('responsible', function () {
  return publish.call(this, Responsible)
})
