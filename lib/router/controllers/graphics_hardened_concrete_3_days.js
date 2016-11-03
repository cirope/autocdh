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
    days: 3, stress: { $ne: null }, sampleId: { $in: sampleIds }
  }, {
    sort: { moldingIn: 1, crackedIn: -1 }
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
    while (filter.start.isBefore(filter.end)) {
      var dayEnd    = filter.start.clone().endOf('day')
      var _samples  = _.filter(samples, function (sample) {
        return moment(sample.date).isBetween(filter.start, dayEnd)
      })
      var sampleIds = _.pluck(_samples, '_id')
      var _cracks   = _.filter(cracks, function (crack) {
        return _.contains(sampleIds, crack.sampleId)
      })
      var serie     = -1
      var i         = 0

      _.each(_cracks, function (crack) {
        var concrete       = Concretes.findOne({ sampleId: crack.sampleId })
        var _strength      = Strengths.findOne(concrete.strengthId)
        var concreteNumber = _strength && _strength.resistant
        var crackedIn      = moment(crack.crackedIn).endOf('day')
        var moldingIn      = moment(crack.moldingIn).endOf('day')
        var dateDiff       = crackedIn.diff(moldingIn, 'days')

        if (concreteNumber && dateDiff >= 3 && dateDiff <= 4) {
          var value = Math.round(crack.stress / +concreteNumber * 100)

          if (! series[serie = i])
            series[serie] = {
              data:      [],
              className: 'ct-series ct-series-a only-points',
            }

          series[serie].data[labels.length] = {
            meta:  crack.designation,
            value: value
          }

          values.push(value)
        } else {
          cracks = _.without(cracks, crack)
        }

        i++
      })

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
    }

    if (setting && setting.resistance3Days) {
      var resistance3Days = Graphics.arrayOf(setting.resistance3Days, labels.length)

      series.unshift({
        className: 'ct-series ct-series-m transparent-points dotted-a',
        data: resistance3Days
      })
    }

    var mean = Graphics.mean(values)

    if (values.length) {
      series.unshift({
        data:      Graphics.arrayOf(mean, labels.length),
        className: 'ct-series ct-series-b transparent-points dotted-a'
      })
    }
  }

  return {
    samples:  samples,
    cracks:   cracks,
    strength: strength || { name: TAPi18n.__('graphic_filter_all') },
    labels:   labels,
    series:   series,
    mean:     mean,
    filter:   {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    }
  }
}

GraphicHardenedConcrete3DaysResistanceController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(hardenedConcreteData.bind(self))
  }
})
