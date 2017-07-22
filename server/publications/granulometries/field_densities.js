Meteor.publish('fieldDensities', function () {
  return publish.call(this, FieldDensities)
})

Meteor.publish('fieldDensitiesLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, FieldDensities, {}, options)
})
