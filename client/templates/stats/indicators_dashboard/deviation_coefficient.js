var deviationCoefficientSettings = null

Template.statsIndicatorsDashboardDeviationCoefficient.onCreated(function () {
  var qaSettings  = this.data.settings && this.data.settings.qa
  var indicators  = qaSettings && qaSettings.indicators
  var percentages = qaSettings && qaSettings.dispatchedPercentages

  if (! percentages || ! indicators) return

  deviationCoefficientSettings = indicators.deviationCoefficientMin && indicators.deviationCoefficientMax && {
    min: indicators.deviationCoefficientMin,
    max: indicators.deviationCoefficientMax
  }

  StatsIndicators.strengths            = this.data.strengths
  StatsIndicators.deviationPercentages = percentages
})

Template.statsIndicatorsDashboardDeviationCoefficient.onDestroyed(function () {
  deviationCoefficientSettings         = null
  StatsIndicators.strengths            = null
  StatsIndicators.deviationPercentages = null
})

Template.statsIndicatorsDashboardDeviationCoefficient.helpers({
  deviationCoefficient: function () {
    if (deviationCoefficientSettings) {
      var month                = moment(this.value, 'YYYYMM')
      var deviationCoefficient = StatsIndicators.deviationCoefficientFor(month)
      var cssClass             = 'success'

      if (parseFloat(deviationCoefficient) < deviationCoefficientSettings.min) cssClass = 'danger'
      if (parseFloat(deviationCoefficient) > deviationCoefficientSettings.max) cssClass = 'warning'

      return {
        value: deviationCoefficient,
        class: deviationCoefficient !== TAPi18n.__('no_data_abbr') && (cssClass + ' pointer-cursor')
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})

Template.statsIndicatorsDashboardDeviationCoefficient.events({
  'click [data-details-for]': function (event, template) {
    var _month     = $(event.currentTarget).data('detailsFor')
    var month      = moment(_month, 'YYYYMM')
    var deviations = StatsIndicators.deviations(month, { coefficient: true, unit: '%' })
    var data       = {
      month:      month.format('MMMM YYYY').toUpperCase(),
      deviations: Strengths.find().map(function (strength) {
        var coefficient = deviations[strength.resistant]
        var deviation   = coefficient * strength.resistant / 100

        return {
          strength:    strength.name,
          deviation:   isNaN(deviation) ? TAPi18n.__('no_data_abbr') : deviation.toFixed(1),
          coefficient: _.isNumber(coefficient) ? coefficient.toFixed(1) + '%' : coefficient
        }
      })
    }

    Session.set('indicatorDetailsTemplateData', data)
    Session.set('indicatorDetailsTemplate', 'statsIndicatorsDashboardDeviationCoefficientDetails')
  }
})
