Meteor.publish('cracks', function () {
  return publish.call(this, Cracks)
})

Meteor.publish('cracksLimited', function (selector, options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, Cracks, selector, options)
})
