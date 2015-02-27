Meteor.publish('granulometries', function () {
  return Granulometries.find({ userId: this.userId })
})

Meteor.publish('granulometriesLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return Granulometries.find({ userId: this.userId }, options)
})
