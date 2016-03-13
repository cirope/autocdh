var mean = function (settlements) {
  var sum = _.reduce(settlements, function (memo, settlement) {
    return memo + settlement
  }, 0)

  return sum / settlements.length
}

var deviation = function (settlements) {
  var _mean         = mean(settlements)
  var deviations    = []
  var deviationsSum = 0

  _.each(settlements, function (settlement) {
    deviations.push(Math.pow(settlement - _mean, 2))
  })

  deviationsSum = _.reduce(deviations, function (memo, d) {
    return memo + d
  }, 0)

  return Math.sqrt(deviationsSum / (settlements.length - 1))
}

var updateChart = function (data) {
  setTimeout(function () {
    if ($('[data-chart]').length) {
      var options = {
        low:   0,
        axisX: {
          labelInterpolationFnc: function (value, index) {
            var module = Math.round(data.labels.length / 12)

            return index % module === 0 ? value : null
          }
        },
        axisY: {
          scaleMinSpace: 10,
          onlyInteger: true
        },
        plugins: [
          Chartist.plugins.tooltip(),
          Chartist.plugins.ctAxisTitle({
            axisX: {
              axisTitle: '',
              axisClass: 'ct-axis-title',
              offset: {
                x: 0,
                y: 0
              }
            },
            axisY: {
              axisTitle: TAPi18n.__('graphic_fresh_concrete_settlement_y_label'),
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
      }

      new Chartist.Line('[data-chart]', data, options)
    }
  }, 200)
}

Template.graphicFreshConcreteSettlement.onRendered(function () {
  updateChart(_.pick(this.data, 'labels', 'series'))
})

Template.graphicFreshConcreteSettlement.helpers({
  sampleCount: function () {
    updateChart(_.pick(this, 'labels', 'series'))

    return this.samples.count()
  },

  mean: function () {
    return mean(this.values)
  },

  standardDeviation: function () {
    return deviation(this.values)
  }
})
