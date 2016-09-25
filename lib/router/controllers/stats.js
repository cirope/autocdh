var defaultStrength = function () {
  var strength = Strengths.findOne({}, { sort: { createdAt: 1 }, fields: { _id: 1 } })

  return strength && strength._id
}

var tenPercentCriteria = function (stresses) {
  var removeCount    = Math.round(stresses.length * 0.1)
  var sumFunction    = function (memo, s) { return memo + s.stress }
  var mean           = _.reduce(stresses, sumFunction, 0) / stresses.length
  var sortedStresses = _.sortBy(stresses, function (s) { return Math.abs(s.stress - mean) })

  return _.initial(sortedStresses, removeCount)
}

StatsDeviationController = RouteController.extend({
  data: function () {
    var query     = _.defaults(this.params.query, {
      strengthId: defaultStrength(),
      start:      moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
      end:        moment().startOf('day').format('YYYY-MM-DD')
    })
    var deviation = Deviations.findOne()
    var filter    = Graphics.castQuery(query)
    var strength  = Strengths.findOne(filter.strengthId)
    var samples   = Graphics.filterSamples(filter)
    var sampleIds = _.pluck(samples.fetch(), '_id')
    var siblings  = {}
    var stresses  = []
    var cracks    = Cracks.find({
      days:     { $gte: 28 },
      stress:   { $ne: null },
      error:    { $lte: 15 },
      sampleId: { $in: sampleIds },
      tubeType: { $ne: 'bending' }
    }, {
      sort:     { crackedIn: 1 }
    })

    cracks.forEach(function (crack) {
      var sibling = siblings[crack.sampleId]

      if (sibling) {
        var stress = (crack.stress + sibling.stress) / 2
        var sample = Samples.findOne(crack.sampleId)

        stresses.push({ sample: sample, crack: crack, stress: stress })
      } else {
        siblings[crack.sampleId] = crack
      }
    })

    if (filter.tenPercentCriteria && filter.tenPercentCriteria === 'true')
      stresses = tenPercentCriteria(stresses)

    return {
      samples:   Graphics.filterSamples(Graphics.castQuery(query)),
      strength:  strength,
      stresses:  stresses,
      deviation: deviation ? deviation.value : 1.64,
      filter:    {
        start: moment(query.start).toDate(),
        end:   moment(query.end).toDate()
      }
    }
  }
})

StatsForSamplesController = RouteController.extend({
  data: function () {
    var query    = _.defaults(this.params.query, {
      start: moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
      end:   moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
    })
    var filter   = Graphics.castQuery(query)
    var strength = Strengths.findOne(filter.strengthId)
    var samples  = Graphics.filterSamples(filter)

    return {
      samples:   samples,
      strength:  strength,
      filter:    {
        start: moment(query.start).toDate(),
        end:   moment(query.end).toDate()
      }
    }
  }
})
