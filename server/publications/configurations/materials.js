Meteor.publish('materials', function () {
  return publish.call(this, Materials)
})
