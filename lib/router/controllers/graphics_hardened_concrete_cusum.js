var defaultStrength = function () {
  var strength = Strengths.findOne({}, { sort: { createdAt: 1 }, fields: { _id: 1 } })

  return strength && strength._id
}

var hardenedConcreteData = function () {
  var series         = []
  var labels         = []
  var query          = _.defaults(this.params.query, {
    strengthId: defaultStrength(),
    start:      moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
    end:        moment().subtract(28, 'days').startOf('day').format('YYYY-MM-DD')
  })
  var filter         = Graphics.castQuery(query)
  var strength       = Strengths.findOne(filter.strengthId)
  var cusum          = 0
  var cracksSelector = { days: { $gte: 28 }, stress: { $ne: null }, error: { $lte: 15 } }

  if (strength && strength.cusumTarget && filter.discardHighErraticValues === 'true')
    cracksSelector.stress = { $ne: null, $lte: strength.cusumTarget + 15 }

  if (Graphics.filterSamples(filter).count() && strength && strength.cusumTarget) {
    series.push({ data: [], className: 'ct-series ct-series-a only-line' })

    while (filter.start.isBefore(filter.end)) {
      var dayEnd    = filter.start.clone().endOf('day')
      var samples   = Graphics.filterSamples(_.extend(_.clone(filter), { end: dayEnd }), { fields: { _id: 1 } })
      var sampleIds = _.pluck(samples.fetch(), '_id')
      var cracks    = Cracks.find(_.extend(_.clone(cracksSelector), { sampleId: { $in: sampleIds }}))
      var target    = strength.cusumTarget

      cracks.forEach(function (crack) {
        cusum += (crack.stress - target)
      })

      series[0].data[labels.length] = { value: cusum }

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
    }
  }

  return {
    samples:  strength && strength.cusumTarget && Graphics.filterSamples(Graphics.castQuery(query)),
    strength: strength,
    labels:   labels,
    series:   series,
    filter:   {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    }
  }
}

GraphicHardenedConcreteCusumController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(hardenedConcreteData.bind(self))
  }
})
