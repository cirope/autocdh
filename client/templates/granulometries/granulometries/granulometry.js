var type        = 'sand'

var limitCurves = {
  sand: {
    default: [
      [2, 10, 25, 50, 80, 95, 100],
      [10, 30, 60, 85, 100, 100, 100],
      [10, 50, 95, 100, 100, 100, 100]
    ]
  },
  gravel: {
    13: [
      [0,  0, 40,  90, 100, 100, 100, 100, 100, 100],
      [5, 15, 70, 100, 100, 100, 100, 100, 100, 100]
    ],
    19: [
      [0,  0, 20, 47.26,  90, 100, 100, 100, 100, 100],
      [5, 10, 55, 72.53, 100, 100, 100, 100, 100, 100]
    ],
    25: [
      [0,  0, 14.05, 25, 55.53,  95, 100, 100, 100, 100],
      [5, 10, 38.11, 60, 77.44, 100, 100, 100, 100, 100]
    ],
    38: [
      [0, 0, 10, 19.74, 35, 59.32,  95, 100, 100, 100],
      [0, 5, 30, 45.58, 70, 82.16, 100, 100, 100, 100]
    ],
    50: [
      [0, 0,  8.43, 15, 23.72, 35,  59.9,  95, 100, 100],
      [0, 5, 19.05, 30, 47.44, 70, 82.45, 100, 100, 100]
    ],
    "19-38": [
      [0, 0,    0,     0,  0, 20,  90, 100, 100, 100],
      [0, 0, 5.71, 11.19, 15, 55, 100, 100, 100, 100]
    ]
  }
}

/*
 Tamiz 2" (51 mm): 100% (Curvas A y B)
 Tamiz 1 1/2" (38 mm): 90% (Curva A) - 100% (Curva B)
 Tamiz 1" (25 mm): 20% (Curva A) - 55% (Curva B)
 Tamiz 3/4" (19 mm): 0% (Curva A) - 15% (Curva B)
 Tamiz 1/2" (12 mm): 0% (Curva A) - 10% (Curva B)
 Tamiz 3/8" (9 mm): 0% (Curva A) - 5% (Curva B)
 Tamices inferiores (4,8 y 2,4 mm): 0% - 0%
 */


var graphLabels = function () {
  var seedLabels = _.pluck(this.data.test, 'sieve').slice(0, -1).reverse()

  if (type === 'gravel' && seedLabels) {
    seedLabels.splice(1, 0, '')
    seedLabels.splice(3, 0, '')
    seedLabels.splice(10, 1)
  }

  return seedLabels
}

var scaleGravel = function (values) {
  var _values = _.clone(values)

  if (_values) {
    _values.splice(1, 0, (_values[0] + _values[1]) / 2)
    _values.splice(3, 0, (_values[2] + _values[3]) / 2)
    _values.splice(10, 1)
  }

  return _values
}

var graphData = function () {
  var seedData = this.data.chartData.slice(0, -1).reverse()
  var series   = []
  var curves   = Session.get('showLimitCurves')

  if (type === 'gravel') seedData = scaleGravel(seedData)

  series.push({
    data:      seedData,
    className: 'ct-series ct-series-a only-line',
  })

  if (curves) {
    var classes = ['ct-series-b', 'ct-series-c', 'ct-series-d']

    _.each(limitCurves[type][curves], function (values, i) {
      if (type === 'gravel') values = scaleGravel(values)

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

Template.granulometry.onCreated(function () {
  type = this.data.type
})

Template.granulometry.onRendered(function () {
  updateChart.apply(this)
})

Template.granulometry.onDestroyed(function () {
  Session.set('showLimitCurves')
})

Template.granulometry.helpers({
  material: function () {
    var materialId    = this.materialId
    var materialList  = Materials.first()
    var materials     = materialList && materialList[this.type + 's']
    var material      = _.findWhere(materials, { _id: materialId })

    return material && material.name
  },

  type: function () {
    return TAPi18n.__('granulometry_type_' + this.type)
  },

  sand: function () {
    return type === 'sand'
  },

  responsible: function () {
    return this.responsibleId && Responsible.findOne(this.responsibleId).name
  },

  provider: function () {
    return this.providerId && Providers.findOne(this.providerId).name
  },

  plant: function () {
    return this.plantId && Plants.findOne(this.plantId).name
  },

  dried: function () {
    return TAPi18n.__(this.dried ? 'yes' : 'no')
  },

  washed: function () {
    return TAPi18n.__(this.washed ? 'yes' : 'no')
  },

  showLimitCurves: function () {
    return Session.get('showLimitCurves')
  },

  sizes: function () {
    return [13, 19, 25, "19-38", 38, 50]
  },

  hasMixtures: function () {
    return Mixtures.find({ 'granulometries.id': this._id }).count()
  }
})

Template.granulometry.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeGranulometry', template.data._id, function (error) {
        if (! error) Router.go('granulometries')
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
