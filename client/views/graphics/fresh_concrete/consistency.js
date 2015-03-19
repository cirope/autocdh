var updateChart = function (data) {
  setTimeout(function () {
    if ($('.ct-chart').length) {
      var options = {
        low:      0,
        showLine: false,
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 30 === 0 ? value : null
          }
        }
      }

      new Chartist.Line('.ct-chart', data, options)
    }
  })
}

Template.graphicFreshConcreteConsistency.rendered = function () {
  updateChart(_.pick(this.data, 'labels', 'series'))
}

Template.graphicFreshConcreteConsistency.helpers({
  sampleCount: function () {
    updateChart(_.pick(this, 'labels', 'series'))

    return this.samples.count()
  }
})
