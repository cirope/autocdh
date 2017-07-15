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
  }
})
