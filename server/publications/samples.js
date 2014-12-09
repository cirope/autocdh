Meteor.publish('samples', function () {
  return Samples.find({ userId: this.userId })
})

Meteor.publish('samplesLimited', function (options) {
  check(options, { sort:  Object, limit: Number })

  return Samples.find({ userId: this.userId }, options)
})
