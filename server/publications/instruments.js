Meteor.publish('instruments', function () {
  return publish.call(this, Instruments)
})
