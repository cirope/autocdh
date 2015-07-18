var updateChart = function (data) {
  setTimeout(function () {
    if ($('[data-chart]').length) {
      var options = {
        low:        0,
        showLine:   true,
        lineSmooth: false,
        plugins: [
          Chartist.plugins.tooltip()
        ]
      }

      new Chartist.Line('[data-chart]', data, options)
    }
  }, 200)
}

Template.graphicConcreteEfficiency.onRendered(function () {
  updateChart(_.pick(this.data, 'labels', 'series'))
})

Template.graphicConcreteEfficiency.helpers({
  sampleCount: function () {
    updateChart(_.pick(this, 'labels', 'series'))

    return this.samples.count()
  }
})
