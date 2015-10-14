var defaultStrength = function () {
  var strength = Strengths.findOne({}, { sort: { createdAt: 1 }, fields: { _id: 1 } })

  return strength && strength._id
}

var hardenedConcreteData = function () {
  var series    = []
  var labels    = []
  var query     = _.defaults(this.params.query, {
    strengthId: defaultStrength(),
    start:      moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
    end:        moment().startOf('day').format('YYYY-MM-DD')
  })
  var filter    = Graphics.castQuery(query)
  var strength  = Strengths.findOne(filter.strengthId)
  var setting   = Settings.findOne()

  if (Graphics.filterSamples(filter).count()) {
    while (filter.start.isBefore(filter.end)) {
      var dayEnd    = filter.start.clone().endOf('day')
      var samples   = Graphics.filterSamples(_.extend(_.clone(filter), { end: dayEnd }), { fields: { _id: 1 } })
      var sampleIds = _.pluck(samples.fetch(), '_id')
      var cracks    = Cracks.find({ days: 7, stress: { $ne: null }, sampleId: { $in: sampleIds } })
      var serie     = -1
      var i         = 0

      cracks.forEach(function (crack) {
        var concreteNumber = strength && strength.name.match(/\d+/)
        var dateDiff       = moment(crack.crackedIn).diff(crack.moldingIn, 'days')

        if (concreteNumber && dateDiff >= 7 && dateDiff <= 12) {
          if (! series[serie = i])
            series[serie] = {
              data:      [],
              className: 'ct-series ct-series-a only-points',
            }

          series[serie].data[labels.length] = {
            meta:  crack.designation,
            value: Math.round(crack.stress / +concreteNumber[0] * 100)
          }
        }

        i++
      })

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
    }

    if (setting && setting.resistance7Days) {
      var resistance7Days = Graphics.arrayOf(setting.resistance7Days, labels.length)

      series.unshift({
        className: 'ct-series ct-series-m only-line dotted-a',
        data: resistance7Days
      })
    }
  }

  return {
    samples:  Graphics.filterSamples(Graphics.castQuery(query)),
    strength: strength,
    labels:   labels,
    series:   series,
    filter:   {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    }
  }
}

GraphicHardenedConcrete7DaysResistanceController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(hardenedConcreteData.bind(self))
  }
})
