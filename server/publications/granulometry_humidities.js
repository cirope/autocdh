Meteor.publish('granulometryHumidities', function () {
  return publish.call(this, GranulometryHumidities)
})

Meteor.publish('granulometryHumiditiesLimited', function (options) {
  check(options, { sort: Object, limit: Number })

  return publish.call(this, GranulometryHumidities, {}, options)
})
