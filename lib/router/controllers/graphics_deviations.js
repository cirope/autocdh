var deviationData = function () {
  var series    = []
  var labels    = []
  var query     = _.defaults(this.params.query, {
    start: moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
    end:   moment().startOf('day').format('YYYY-MM-DD')
  })
  var filter    = Graphics.castQuery(query)
  var strength  = Strengths.findOne(filter.strengthId)
  var setting   = Settings.findOne()

  if (Graphics.filterSamples(filter).count()) {
    series.push({ className: 'ct-series ct-series-a', data: [] })

    while (filter.start.isBefore(filter.end)) {
      var endOfMonth = filter.start.clone().endOf('month')
      var actualEnd  = endOfMonth.isBefore(filter.end) ? endOfMonth : filter.end
      var samples    = Graphics.filterSamples(_.extend(_.clone(filter), { end: actualEnd }), { fields: { _id: 1 } })
      var sampleIds  = _.pluck(samples.fetch(), '_id')
      var cracks     = Cracks.find({ days: { $gte: 28 }, stress: { $ne: null }, error: { $lte: 15 }, sampleId: { $in: sampleIds }})
      var average    = _.reduce(cracks.fetch(), function (memo, c) {
        var concretes      = Concretes.findOne({ sampleId: c.sampleId }).concretes
        var concreteAmount = _.reduce(concretes, function (memo, concrete) { return memo + concrete.amount }, 0)

        return memo + c.stress / concreteAmount * 10
      }, 0) / cracks.count()

      series[0].data.push(cracks.count() ? Math.round(average * 100) / 100 : null)

      labels.push(filter.start.clone().startOf('month').format('L'))

      filter.start.add(1, 'month').startOf('month')
    }

    if (setting && setting.efficiencyDesirable && setting.efficiencyDesirableLow) {
      var upperLimit = Graphics.arrayOf(setting.efficiencyDesirable,    labels.length)
      var lowerLimit = Graphics.arrayOf(setting.efficiencyDesirableLow, labels.length)

      series.unshift({
        className: 'ct-series ct-series-m transparent-points dotted-a',
        data: upperLimit
      })

      series.unshift({
        className: 'ct-series ct-series-e transparent-points dotted-b',
        data: lowerLimit
      })
    }
  }

  return {
    samples:  Graphics.filterSamples(Graphics.castQuery(query)),
    strength: strength || { name: TAPi18n.__('graphic_filter_all') },
    labels:   labels,
    series:   series,
    filter:   _.extend(filter, {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    })
  }
}

GraphicConcreteEfficiencyController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(deviationData.bind(self))
  }
})
