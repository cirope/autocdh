Granulometries = new Ground.Collection(new Mongo.Collection('granulometries'), { version: 1.0 })

Granulometries.attachSchema(Schemas.Granulometry)

Granulometries.allow({
  update: ownsDocument,
  remove: ownsDocument
})

Granulometries.setType = function (type) {
  var schema   = Schemas.Granulometry.schema()
  var settings = {
    sand: {
      count: 8,
      label: TAPi18n.__('granulometry_test_net_weight'),
      omit:  false
    },

    gravel: {
      count: 11,
      label: TAPi18n.__('granulometry_test_retained'),
      omit:  true
    }
  }[type]

  schema['test.$.netWeight'].label            = settings.label
  schema['test.$.grossWeight'].autoform.omit  = settings.omit
  schema.test.minCount = schema.test.maxCount = settings.count

  Session.set('granulometryType', type)
}

var humidityPercentageFor = function (granulometry) {
  var humidity = granulometry.humidity
  var netWet   = humidity && humidity.massOfWetAggregate - humidity.massOfContainer
  var netDry   = humidity && humidity.massOfDryAggregate - humidity.massOfContainer

  return netDry > 0 ? (netWet - netDry) / netDry * 100 : 0
}

var thinPercentageFor = function (granulometry) {
  var thin           = granulometry.thin
  var netBefore      = thin && thin.massBeforeWash - thin.massOfContainer
  var netAfter       = thin && thin.massAfterWash  - thin.massOfContainer

  return netAfter > 0 ? (netBefore - netAfter) / netBefore * 100 : 0
}

var finenessFor = function (granulometry) {
  var fineness            = 0
  var retained            = []
  var retainedAccumulated = 0
  var passedPercentage    = 0
  var sampleWeight        = _.reduce(granulometry.test, function (memo, t) {
    return memo + (granulometry.type === 'sand' ? t.grossWeight - t.netWeight : t.netWeight)
  }, 0)
  var correction          = Math.round(sampleWeight * granulometry.thin.percentage / 100)
  var retainedTotal       = sampleWeight + correction

  granulometry.test.forEach(function (test, i) {
    var testRetained = granulometry.type === 'sand' ? test.grossWeight - test.netWeight : test.netWeight
    var last         = i === 7 && granulometry.type === 'sand' || i === 10

    retainedAccumulated += testRetained
    passedPercentage     = last ? 0 : Math.round((retainedTotal - retainedAccumulated) / retainedTotal * 100)

    retained.push(100 - passedPercentage)
  })

  if (granulometry.type === 'sand') {
    fineness = _.reduce(retained.slice(0, -1), function (memo, n) { return memo + n }, 0) / 100
  } else {
    var indexes = [0, 3, 5, 7, 8, 9, 10]

    fineness = _.reduce(indexes, function (memo, i) {
      return memo + retained[i]
    }, 300 - 3 * granulometry.thin.percentage) / 100
  }

  return fineness
}

var addExtraAttributes = function (granulometry) {
  granulometry.humidity.percentage = humidityPercentageFor(granulometry)
  granulometry.thin.percentage     = thinPercentageFor(granulometry)
  granulometry.fineness            = finenessFor(granulometry)

  return granulometry
}

var extraModifierAttributes = function (granulometry) {
  granulometry.thin.percentage = thinPercentageFor(granulometry)

  return {
    $set: {
      'humidity.percentage': humidityPercentageFor(granulometry),
      'thin.percentage':     granulometry.thin.percentage,
      'fineness':            finenessFor(granulometry)
    }
  }
}

Meteor.methods({
  createGranulometry: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Granulometries.insert(addExtraAttributes(doc))

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('granulometry', doc)
      }, 100)
  },

  updateGranulometry: function (modifier, documentId) {
    Granulometries.update(documentId, modifier, function (error) {
      if (! error) {
        var extraModifier = extraModifierAttributes(Granulometries.findOne(documentId))

        Granulometries.update(documentId, extraModifier)
      }
    })

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('granulometry', { _id: documentId })
      }, 100)
  },

  removeGranulometry: function (documentId) {
    Granulometries.remove(documentId)
  }
})
