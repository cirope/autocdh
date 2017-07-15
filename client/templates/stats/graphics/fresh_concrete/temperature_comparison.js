var updateChart = function (data) {
  setTimeout(function () {
    if ($('[data-chart]').length) {
      var options = {
        low:   data.low || 0,
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return +value % 1 === 0 ? value : ' '
          }
        },
        plugins: [
          Chartist.plugins.tooltip(),
          Chartist.plugins.ctAxisTitle({
            axisX: {
              axisTitle: TAPi18n.__('graphic_fresh_concrete_temperature_comparison_x_label'),
              axisClass: 'ct-axis-title',
              offset: {
                x: 0,
                y: 30
              },
              textAnchor: 'middle'
            },
            axisY: {
              axisTitle: TAPi18n.__('graphic_fresh_concrete_temperature_comparison_y_label'),
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

Template.graphicFreshConcreteTemperatureComparison.onRendered(function () {
  updateChart(_.pick(this.data, 'labels', 'series', 'low'))
})

Template.graphicFreshConcreteTemperatureComparison.helpers({
  sampleCount: function () {
    updateChart(_.pick(this, 'labels', 'series', 'low'))

    return this.samples.count()
  }
})
