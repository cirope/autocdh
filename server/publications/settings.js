Meteor.publish('settings', function () {
  return Settings.find({ userId: this.userId })
})
