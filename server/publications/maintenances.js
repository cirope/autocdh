Meteor.publish('maintenances', function () {
  return publish.call(this, Maintenances)
})

Meteor.publish('maintenancesLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, Maintenances, {}, options)
})
