Meteor.publish('nonconformities', function () {
  return publish.call(this, Nonconformities)
})

Meteor.publish('nonconformitiesLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, Nonconformities, {}, options)
})
