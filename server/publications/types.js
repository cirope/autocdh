Meteor.publish('types', function () {
  return Types.find({ userId: this.userId })
})
