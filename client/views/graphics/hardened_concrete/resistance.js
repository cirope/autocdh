var updateChart = function (data) {
  setTimeout(function () {
    if ($('.ct-chart').length) {
      var options = {
        low:   0,
        showLine: true,
        axisX: {
          labelInterpolationFnc: function (value, index) {
            var module = Math.round(data.labels.length / 12)

            return index % module === 0 ? value : null
          }
        }
      }

      var chart = new Chartist.Line('.ct-chart', data, options)

      chart.on('draw', function (data) {
        if (data.type === 'point' && data.value <= 0) data.element.attr({ class: 'hidden' })
      })
    }
  })
}

Template.graphicHardenedConcreteResistance.rendered = function () {
  updateChart(_.pick(this.data, 'labels', 'series'))
}

Template.graphicHardenedConcreteResistance.helpers({
  sampleCount: function () {
    updateChart(_.pick(this, 'labels', 'series'))

    return this.samples.count()
  }
})
