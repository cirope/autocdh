Meteor.publish('humidities', function () {
  return Humidities.find({ userId: this.userId })
})
