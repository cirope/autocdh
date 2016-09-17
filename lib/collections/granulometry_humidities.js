GranulometryHumidities = new Ground.Collection(new Mongo.Collection('granulometry_humidities'), { version: 1.0 })

GranulometryHumidities.attachSchema(Schemas.GranulometryHumidity)

GranulometryHumidities.allow({
  update: ownsDocument,
  remove: ownsDocument
})

var humidityPercentageFor = function (granulometryHumidity) {
  var humidity = granulometryHumidity.humidity
  var netWet   = humidity && humidity.massOfWetAggregate - humidity.massOfContainer
  var netDry   = humidity && humidity.massOfDryAggregate - humidity.massOfContainer

  return netDry > 0 ? (netWet - netDry) / netDry * 100 : 0
}

var addExtraAttributes = function (granulometryHumidity) {
  if (granulometryHumidity.humidity)
    granulometryHumidity.humidity.percentage = humidityPercentageFor(granulometryHumidity)

  return granulometryHumidity
}

var extraModifierAttributes = function (granulometryHumidity) {
  var modifier = {}

  if (granulometryHumidity.humidity)
    modifier['humidity.percentage'] = humidityPercentageFor(granulometryHumidity)

  return { $set: modifier }
}

Meteor.methods({
  createGranulometryHumidity: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    GranulometryHumidities.insert(addExtraAttributes(doc))

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('granulometryHumidity', doc)
      }, 100)
  },

  updateGranulometryHumidity: function (modifier, documentId) {
    GranulometryHumidities.update(documentId, modifier, function (error) {
      var granulometryHumidity = GranulometryHumidities.findOne(documentId)

      if (! error) {
        var extraModifier = extraModifierAttributes(granulometryHumidity)

        GranulometryHumidities.update(documentId, extraModifier)
      }
    })

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('granulometryHumidity', { _id: documentId })
      }, 100)
  },

  removeGranulometryHumidity: function (documentId) {
    GranulometryHumidities.remove(documentId)
  }
})
