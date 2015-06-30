Meteor.publish('samples', function () {
  return publish.call(this, Samples)
})

Meteor.publish('samplesLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, Samples, {}, options)
})
