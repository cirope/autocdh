Meteor.publish('limits', function () {
  return publish.call(this, Limits)
})

Meteor.publish('limitsLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, Limits, {}, options)
})
