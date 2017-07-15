var rules = {
  3: {
    min: 20,
    max: 80,
    daysMin: 3,
    daysMax: 4
  },

  7: {
    min: 40,
    max: 90,
    daysMin: 6,
    daysMax: 9
  },

  28: {
    min: 80,
    max: 120,
    daysMin: 20,
    daysMax: 40,
    default: 100
  },

  56: {
    min: 101,
    max: 130,
    daysMin: 50,
    daysMax: 75
  },

  90: {
    min: 105,
    max: 150,
    daysMin: 76,
    daysMax: 120
  }
}

var hardenedConcreteData = function () {
  var series       = []
  var labels       = []
  var values       = []
  var graphValues  = []
  var query        = _.defaults(this.params.query, {
    start: moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
    end:   moment().startOf('day').format('YYYY-MM-DD')
  })
  var filter       = Graphics.castQuery(query)
  var strength     = Strengths.findOne(filter.strengthId)
  var setting      = Settings.findOne()
  var samples      = Graphics.filterSamples(filter).fetch()
  var sampleIds    = _.pluck(samples, '_id')
  var cracksCursor = Cracks.find({
    days: 28, stress: { $ne: null }, sampleId: { $in: sampleIds }
  }, {
    sort: { sampleId: 1 }
  })
  var cracksCache  = Cracks.find({
    days:     { $ne: 28 },
    stress:   { $ne: null },
    sampleId: { $in: sampleIds }
  }).fetch()
  var bySample     = {}
  var cracks       = []

  cracksCursor.forEach(function (crack) {
    var sibling = bySample[crack.sampleId]

    if (sibling) {
      var stress = Math.round((crack.stress + sibling.stress) * 100) / 200

      cracks.push(_.extend(crack, { stress:  stress }))
    } else if (_.isNumber(crack.error)) {
      bySample[crack.sampleId] = crack
    } else {
      cracks.push(crack)
    }
  })

  if (cracks.length) {
    var percentages = _.reduce(rules, function (object, value, key) {
      object[key] = []

      return object
    }, {})

    _.each(cracks, function (crack) {
      var crackedIn = moment(crack.crackedIn).endOf('day')
      var moldingIn = moment(crack.moldingIn).endOf('day')
      var dateDiff  = crackedIn.diff(moldingIn, 'days')

      if (dateDiff >= 25 && dateDiff <= 44) {
        var stressReference = crack.stress

        _.each(rules, function (rule, days) {
          var _cracks = _.where(cracksCache, { sampleId: crack.sampleId, days: +days })
          var sum     = _.reduce(_cracks, function (memo, crack) {
            var crackedIn = moment(crack.crackedIn).endOf('day')
            var moldingIn = moment(crack.moldingIn).endOf('day')
            var dateDiff  = crackedIn.diff(moldingIn, 'days')

            if (dateDiff >= rule.daysMin && dateDiff <= rule.daysMax)
              return memo + crack.stress
          }, 0)
          var average = _cracks.length && (sum / _cracks.length)
          var ratio   = average && (average * 100 / stressReference)

          if (rule.default)
            percentages[days].push(rule.default)
          else if (ratio >= rule.min && ratio <= rule.max)
            percentages[days].push(ratio)
        })
      }
    })

    if (percentages['3'].length < 5) percentages['3'] = []

    var percentageRatios = _.reduce(percentages, function (object, values, key) {
      var sum = _.reduce(values, function (memo, percentage) {
        return memo + percentage
      }, 0)

      object[key] = values.length && (sum / values.length)

      return object
    }, {})

    var points = [0]

    _.each(percentageRatios, function (percentage, days) {
      if (percentage) points.push(percentage)
    })

    var days   = percentageRatios['90'] ? 91 : (percentageRatios['56'] ? 57 : 29)
    var x      = [0].concat(_.compact(_.map(percentageRatios, function (value, k) { if (value) return +k })))
    var spline = new MonotonicCubicSpline(x, points)

    _.times(days, function (i) {
      if (i === 0)
        graphValues.push(0)
      else if (percentageRatios[i])
        graphValues.push(percentageRatios[i])
      else if (i === days - 1)
        graphValues.push(100)
      else
        graphValues.push(null)

      labels.push('' + i)
      values.push(spline.interpolate(i))
    })

    series.push({
      data:      graphValues,
      className: 'ct-series ct-series-a only-line',
    })
  }

  return {
    samples:          samples,
    cracks:           cracks,
    strength:         strength || { name:  TAPi18n.__('graphic_filter_all') },
    labels:           _.first(labels, labels.length - 1),
    series:           series,
    values:           values,
    percentageRatios: percentageRatios,
    filter:           _.extend(filter, {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    })
  }
}

graphicHardenedConcreteResistanceByCategoryController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(hardenedConcreteData.bind(self))
  }
})
