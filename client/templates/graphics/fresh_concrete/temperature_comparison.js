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
          Chartist.plugins.tooltip()
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
