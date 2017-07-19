Meteor.publish('complaints', function () {
  return publish.call(this, Complaints)
})

Meteor.publish('complaintsLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, Complaints, {}, options)
})
