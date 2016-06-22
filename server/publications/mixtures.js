Meteor.publish('mixtures', function () {
  return publish.call(this, Mixtures)
})

Meteor.publish('mixturesLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, Mixtures, {}, options)
})
