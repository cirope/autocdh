var updateChart = function (data) {
  setTimeout(function () {
    if ($('[data-chart]').length) {
      var options = {
        low:      0,
        showLine: true,
        axisX: {
          labelInterpolationFnc: function (value, index) {
            var module = Math.round(data.labels.length / 24)

            return index % module === 0 ? value : null
          }
        },
        chartPadding: {
          top: 15,
          right: 15,
          bottom: 20,
          left: 10
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
              axisTitle: TAPi18n.__('graphic_hardened_concrete_7_days_resistance_y_label'),
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
  }, 500)
}

Template.graphicHardenedConcrete7DaysResistance.onRendered(function () {
  updateChart(_.pick(this.data, 'labels', 'series'))
})

Template.graphicHardenedConcrete7DaysResistance.helpers({
  sampleCount: function () {
    updateChart(_.pick(this, 'labels', 'series'))

    return this.cracks.length
  }
})
