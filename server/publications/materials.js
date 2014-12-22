Meteor.publish('materials', function () {
  return Materials.find({ userId: this.userId })
})
