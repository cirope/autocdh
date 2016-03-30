var updateChart = function (data, type) {
  setTimeout(function () {
    if ($('[data-chart]').length) {
      var options = {
        low: 0,
        high: type === 'sand' ? 10 : 3,
        showLine: true,
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
              axisTitle: TAPi18n.__('graphic_aggregate_thin_y_label'),
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

Template.graphicAggregateThin.onRendered(function () {
  var self = this

  updateChart(_.pick(self.data, 'labels', 'series'), self.data.material.type)
})

Template.graphicAggregateThin.helpers({
  granulometriesCount: function () {
    var self = this

    updateChart(_.pick(self, 'labels', 'series'), self.material.type)

    return self.granulometries.count()
  }
})
