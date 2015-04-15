var updateChart = function (data) {
  setTimeout(function () {
    if ($('[data-chart]').length) {
      var options = {
        low:   0,
        showLine: true,
        axisX: {
          labelInterpolationFnc: function (value, index) {
            var module = Math.round(data.labels.length / 24)

            return index % module === 0 ? value : null
          }
        }
      }

      var chart = new Chartist.Line('[data-chart]', data, options)

      chart.on('draw', function (data) {
        if (data.type === 'point' && data.value <= 0) data.element.attr({ class: 'hidden' })
      })
    }
  })
}

Template.graphicAggregateFineness.onRendered(function () {
  updateChart(_.pick(this.data, 'labels', 'series'))
})

Template.graphicAggregateFineness.helpers({
  granulometriesCount: function () {
    updateChart(_.pick(this, 'labels', 'series'))

    return this.granulometries.count()
  }
})
