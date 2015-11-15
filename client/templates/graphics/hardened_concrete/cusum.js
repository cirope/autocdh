var updateChart = function (data) {
  setTimeout(function () {
    if ($('[data-chart]').length) {
      var options = {
        showLine:   true,
        lineSmooth: false,
        axisX: {
          labelInterpolationFnc: function (value, index) {
            var module = Math.round(data.labels.length / 24)

            return index % module === 0 ? value : null
          }
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
              axisTitle: TAPi18n.__('graphic_hardened_concrete_cusum_y_label'),
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

Template.graphicHardenedConcreteCusum.onRendered(function () {
  updateChart(_.pick(this.data, 'labels', 'series'))
})

Template.graphicHardenedConcreteCusum.helpers({
  sampleCount: function () {
    updateChart(_.pick(this, 'labels', 'series'))

    return this.samples && this.samples.count()
  }
})
