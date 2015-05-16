var defaultStrength = function () {
  var strength = Strengths.findOne({}, { sort: { createdAt: 1 }, fields: { _id: 1 } })

  return strength && strength._id
}

var tenPercentCriteria = function (stresses) {
  var removeCount    = Math.round(stresses.length * 0.1)
  var sumFunction    = function (memo, s) { return memo + s }
  var mean           = _.reduce(stresses, sumFunction, 0) / stresses.length
  var sortedStresses = _.sortBy(stresses, function (s) { return Math.abs(s - mean) })

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
    var samples   = Graphics.filterSamples(filter, { fields: { _id: 1 } })
    var sampleIds = samples.map(function (s) { return s._id })
    var cracks    = Cracks.find({ days: { $gte: 28 }, stress: { $ne: null }, error: { $lte: 15 }, sampleId: { $in: sampleIds } })
    var bySample  = {}
    var stresses  = []

    cracks.forEach(function (crack) {
      var sibling = bySample[crack.sampleId]

      if (sibling)
        stresses.push((crack.stress + sibling.stress) / 2)
      else
        bySample[crack.sampleId] = crack
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
