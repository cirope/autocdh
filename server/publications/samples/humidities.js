Meteor.publish('humidities', function () {
  return publish.call(this, Humidities)
})
