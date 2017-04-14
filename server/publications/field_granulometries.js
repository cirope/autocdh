Meteor.publish('fieldGranulometries', function () {
  return publish.call(this, FieldGranulometries)
})

Meteor.publish('fieldGranulometriesLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, FieldGranulometries, {}, options)
})
