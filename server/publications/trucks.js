Meteor.publish('trucks', function () {
  return Trucks.find({ userId: this.userId })
})
