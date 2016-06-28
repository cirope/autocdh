var tests = [
  { sieve: '76 mm | 3″' },
  { sieve: '63 mm | 2 ½″' },
  { sieve: '51 mm | 2″' },
  { sieve: '38 mm | 1 ½″' },
  { sieve: '25 mm | 1' },
  { sieve: '19 mm | 3/4″' },
  { sieve: '13 mm | 1/2″' },
  { sieve: '9.5 mm | 3/8″' },
  { sieve: '4.8 mm | # 4' },
  { sieve: '2.4 mm | # 8' },
  { sieve: '1.2 mm | # 16' },
  { sieve: '0.59 mm | # 30' },
  { sieve: '0.297 mm | # 50' },
  { sieve: '0.149 mm | # 100' },
  { sieve: 'Fondo | Pasa # 100' }
]

var limitCurves = {
  13: [
    [2, 5, 12, 24, 36, 48, 70, 95, 100, 100, 100, 100, 100, 100],
    [3, 12, 27, 41, 48, 52, 78, 97, 100, 100, 100, 100, 100, 100],
    [5, 20, 35, 50, 64, 78, 93, 100, 100, 100, 100, 100, 100, 100]
  ],
  19: [
    [1, 4, 11, 22, 32, 41, 55, 70, 94, 100, 100, 100, 100, 100],
    [2, 10, 24, 36, 43, 46, 65, 77, 97, 100, 100, 100, 100, 100],
    [4, 15, 28, 44, 58, 72, 86, 93, 100, 100, 100, 100, 100, 100]
  ],
  25: [
    [1, 4, 10, 19, 27, 35, 48, 55, 75, 95, 100, 100, 100, 100],
    [2, 9, 22, 33, 38, 43, 58, 66, 82, 98, 100, 100, 100, 100],
    [5, 18, 31, 44, 56, 69, 81, 87, 94, 100, 100, 100, 100, 100]
  ],
  38: [
    [1, 4, 10, 20, 29, 39, 45, 52, 60, 78, 97, 100, 100, 100],
    [2, 9, 22, 33, 38, 43, 52, 61, 71, 85, 98, 100, 100, 100],
    [4, 17, 30, 42, 53, 66, 77, 83, 88, 94, 100, 100, 100, 100]
  ],
  50: [
    [1, 4, 10, 18, 25, 33, 40, 44, 51, 59, 78, 95, 100, 100],
    [4, 14, 27, 37, 41, 44, 53, 59, 71, 82, 91, 100, 100, 100],
    [4, 17, 30, 42, 53, 63, 74, 79, 85, 90, 95, 100, 100, 100]
  ]
}

var graphLabels = function () {
  var seedLabels = _.pluck(tests, 'sieve').slice(0, -1).reverse()

  seedLabels.splice(5, 0, '')
  seedLabels.splice(7, 0, '')
  seedLabels.splice(14, 1)

  return seedLabels
}

var scaleGravel = function (values) {
  var _values = _.clone(values)

  if (_values) {
    _values.splice(5, 0, (_values[4] + _values[5]) / 2)
    _values.splice(7, 0, (_values[6] + _values[7]) / 2)
    _values.splice(14, 1)
  }

  return _values
}

var graphData = function () {
  var seedData = this.chartData.get().slice(0, -1).reverse()
  var series   = []
  var curves   = Session.get('showLimitCurves')

  seedData = scaleGravel(seedData)

  series.push({
    data:      seedData,
    className: 'ct-series ct-series-a only-line',
  })

  if (curves) {
    var classes = ['ct-series-b', 'ct-series-c', 'ct-series-d']

    _.each(limitCurves[curves], function (values, i) {
      values = scaleGravel(values)

      series.push({
        data:      values,
        className: classes[i] + ' dotted-a'
      })
    })
  }

  return series
}

var updateChart = function () {
  var data = {
    labels: graphLabels.apply(this),
    series: graphData.apply(this)
  }

  setTimeout(function () {
    new Chartist.Line('.ct-chart.ct-granulometry', data, {
      lineSmooth: false,
      showPoint:  false,
      fullWidth:  true,
      low:        0,
      axisX: {
        labelInterpolationFnc: function (value) {
          return _.first(value.split(' | '))
        }
      },
      axisY: {
        labelInterpolationFnc: function (value) {
          return Math.round(value)
        }
      },
      plugins: [
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: TAPi18n.__('granulometry_graph_x_label'),
            axisClass: 'ct-axis-title',
            offset: {
              x: 0,
              y: 35
            },
            textAnchor: 'middle'
          },
          axisY: {
            axisTitle: TAPi18n.__('granulometry_graph_y_label'),
            axisClass: 'ct-axis-title',
            offset: {
              x: 0,
              y: 10
            },
            textAnchor: 'middle',
            flipTitle: true
          }
        })
      ]
    })
  })
}

var processTest = function (granulometry) {
  var result              = []
  var retained            = []
  var retainedAccumulated = 0
  var passedPercentage    = 0
  var passedAccumulated   = 0
  var sampleWeight        = _.reduce(granulometry.test, function (memo, t) {
    return memo + (granulometry.type === 'sand' ? t.grossWeight - t.netWeight : t.netWeight)
  }, 0)
  var correction          = granulometry.thin ? Math.round(sampleWeight * granulometry.thin.percentage / 100) : 0
  var retainedTotal       = sampleWeight + correction

  granulometry.test.forEach(function (test, i) {
    var testRetained = granulometry.type === 'sand' ? test.grossWeight - test.netWeight : test.netWeight
    var last         = i === 7 && granulometry.type === 'sand' || i === 10

    retainedAccumulated += testRetained

    passedPercentage   = last ? 0 : Math.round((retainedTotal - retainedAccumulated) / retainedTotal * 100)
    passedAccumulated += passedPercentage

    retainedAccumulatedPercentage = 100 - passedPercentage

    retained.push(retainedAccumulatedPercentage)

    result.push(_.extend(test, {
      retained:                      testRetained,
      retainedAccumulated:           retainedAccumulated,
      passedPercentage:              passedPercentage,
      passedAccumulated:             passedAccumulated,
      retainedAccumulatedPercentage: retainedAccumulatedPercentage
    }))
  })

  return _.extend(granulometry, {
    test:          result,
    retained:      retained,
    sampleWeight:  sampleWeight,
    correction:    correction,
    retainedTotal: retainedTotal
  })
}

Template.mixture.onCreated(function () {
  this.mf        = new ReactiveVar(0)
  this.chartData = new ReactiveVar([])
})

Template.mixture.onRendered(function () {
  updateChart.apply(this)
})

Template.mixture.onDestroyed(function () {
  Session.set('showLimitCurves')
})

Template.mixture.helpers({
  mixture: function () {
    return _.map(this.granulometries, function (granulometry) {
      return Granulometries.findOne(granulometry.id).name
    }).join(', ')
  },

  granulometries: function () {
    return _.map(this.granulometries, function (granulometry, i) {
      return _.extend(Granulometries.findOne(granulometry.id), {
        index:      i + 1,
        percentage: granulometry.percentage
      })
    })
  },

  mf: function () {
    var template = Template.instance()

    return template.mf.get()
  },

  test: function () {
    var self           = this
    var template       = Template.instance()
    var result         = []
    var chartData      = []
    var selection      = [0, 3, 5, 7, 8, 9, 10, 11, 12, 13]
    var mf             = 0
    var granulometries = _.map(self.granulometries, function (granulometry) {
      var _granulometry = Granulometries.findOne(granulometry.id)

      return _.extend(processTest(_granulometry), {
        percentage: granulometry.percentage
      })
    })

    _.each(tests, function (t, i) {
      var row                           = [t.sieve]
      var retainedAccumulatedPercentage = 0
      var passedPercentage              = 100

      _.each(granulometries, function (granulometry) {
        var test              = _.findWhere(granulometry.test, { sieve: t.sieve })
        var defaultPercentage = granulometry.type === 'sand' ? 0 : 100

        row.push(test ? test.retainedAccumulatedPercentage : defaultPercentage)

        retainedAccumulatedPercentage += granulometry.percentage * _.last(row) / 100
      })

      passedPercentage = 100 - retainedAccumulatedPercentage

      row.push(retainedAccumulatedPercentage, passedPercentage)

      chartData.push(passedPercentage)

      if (_.contains(selection, i))
        mf += retainedAccumulatedPercentage / 100

      result.push({
        items: _.map(row, function (item) {
          return _.isNumber(item) ? item.toFixed(0) + '%' : item
        })
      })
    })

    template.chartData.set(chartData)
    template.mf.set(mf)

    return result
  },

  showLimitCurves: function () {
    return Session.get('showLimitCurves')
  },

  sizes: function () {
    return [13, 19, 25, 38, 50]
  }
})

Template.mixture.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeMixture', template.data._id, function (error) {
        if (! error) Router.go('mixtures')
      })
  },

  'click [data-show="limit-curves"]': function (event, template) {
    Session.set('showLimitCurves', $(event.currentTarget).data('curve'))
    updateChart.apply(template)
  },

  'click [data-hide="limit-curves"]': function (event, template) {
    Session.set('showLimitCurves')
    updateChart.apply(template)
  }
})
