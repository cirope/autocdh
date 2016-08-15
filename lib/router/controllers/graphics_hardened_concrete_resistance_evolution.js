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
          var _cracks = Cracks.find({ sampleId: crack.sampleId, days: +days }).fetch()
          var sum     = _.reduce(_cracks, function (memo, crack) {
            var crackedIn = moment(crack.crackedIn).endOf('day')
            var moldingIn = moment(crack.moldingIn).endOf('day')
            var dateDiff  = crackedIn.diff(moldingIn, 'days')

            if (dateDiff >= rule.daysMin && dateDiff <= rule.daysMax)
              return memo + crack.stress
          }, 0)
          var average = _cracks.length && (sum / _cracks.length)
          var ratio   = average && (average * 100 / stressReference)

          if (ratio >= rule.min && ratio <= rule.max)
            percentages[days].push(ratio)
        })
      }
    })

    var percentageRatios = _.reduce(percentages, function (object, values, key) {
      var sum = _.reduce(values, function (memo, percentage) {
        return memo + percentage
      }, 0)

      object[key] = values.length && (sum / values.length)

      return object
    }, {})

    var nextStart = 0
    var lastPoint = 0
    var segments  = []
    var points    = [0]

    _.each(percentageRatios, function (percentage, days) {
      var fixStart = +days === 7 ? 0 : 0.03

      if (percentage) {
        points.push(percentage)

        segments.push({
          fix:   Smooth([fixStart, 0.335, 0.6, 0.85, 1], { scaleTo: 1 }),
          step:  1 / (+days - nextStart - 1),
          start: nextStart,
          end:   +days
        })

        nextStart = +days
        lastPoint = percentage
      }
    })

    points.push(100)

    var smooth = Smooth(points)
    var days   = percentageRatios['90'] ? 90 : (percentageRatios['50'] ? 50 : 28)
    var index  = 0

    segments.push({
      fix:   Smooth([0.03, 0.335, 0.6, 0.85, 1], { scaleTo: 1 }),
      step:  1 / (days - nextStart),
      start: nextStart,
      end:   days
    })

    _.times(days, function (i) {
      var segment = _.find(segments, function (s) {
        return i >= s.start && i < s.end
      })

      if (i > 0) index += Math.round(segment.step * 1000) / 1000

      if (i === segment.end - 1) index = Math.round(index)

      var integer = Math.floor(index)
      var decimal = index - integer
      var sIndex  = Number.isInteger(index) ? index : integer + segment.fix(decimal)

      labels.push('' + (i + 1))
      values.push(smooth(sIndex))
    })

    series.push({
      data:      values,
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
    filter:           {
      start:     moment(query.start).toDate(),
      end:       moment(query.end).toDate(),
      concretes: filter.concretes
    }
  }
}

GraphicHardenedConcreteResistanceEvolutionController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(hardenedConcreteData.bind(self))
  }
})
