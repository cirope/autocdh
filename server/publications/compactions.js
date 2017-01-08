Meteor.publish('compactions', function () {
  return publish.call(this, Compactions)
})

Meteor.publish('compactionsLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, Compactions, {}, options)
})
