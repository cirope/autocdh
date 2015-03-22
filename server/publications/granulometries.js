Meteor.publish('granulometries', function () {
  return publish.call(this, Granulometries)
})

Meteor.publish('granulometriesLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, Granulometries, options)
})
