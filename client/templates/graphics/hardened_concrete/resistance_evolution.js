var updateChart = function (data) {
  setTimeout(function () {
    if ($('[data-chart]').length) {
      var options = {
        low:      0,
        lineSmooth: Chartist.Interpolation.cardinal({
          fillHoles: true
        }),
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
              axisTitle: TAPi18n.__('graphic_hardened_concrete_resistance_evolution_x_label'),
              axisClass: 'ct-axis-title',
              offset: {
                x: 0,
                y: 35
              }
            },
            axisY: {
              axisTitle: TAPi18n.__('graphic_hardened_concrete_resistance_evolution_y_label'),
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

Template.graphicHardenedConcreteResistanceEvolution.onRendered(function () {
  updateChart(_.pick(this.data, 'labels', 'series'))
})

Template.graphicHardenedConcreteResistanceEvolution.helpers({
  sampleCount: function () {
    updateChart(_.pick(this, 'labels', 'series'))

    return this.cracks.length
  },

  percentageRatios: function () {
    var result = _.map(this.percentageRatios, function (percentage, days) {
      var value = ''

      if (percentage) {
        var rounded = Math.round(percentage * 100) / 100

        value = TAPi18n.__('graphic_hardened_concrete_resistance_evolution_table_value', { percentage: rounded })
      } else {
        value = TAPi18n.__('graphic_hardened_concrete_resistance_evolution_table_no_value')
      }

      return {
        label: TAPi18n.__('graphic_hardened_concrete_resistance_evolution_table_label', { days: days }),
        value: value
      }
    })

    result.splice(2, 0, {
      label: TAPi18n.__('graphic_hardened_concrete_resistance_evolution_table_label', { days: '28' }),
      value: '100%'
    })

    return result
  }
})
