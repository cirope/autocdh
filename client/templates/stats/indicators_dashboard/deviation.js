var deviationSettings = null

Template.statsIndicatorsDashboardDeviation.onCreated(function () {
  var qaSettings  = this.data.settings && this.data.settings.qa
  var indicators  = qaSettings && qaSettings.indicators
  var percentages = qaSettings && qaSettings.dispatchedPercentages

  if (! percentages || ! indicators) return

  deviationSettings = indicators.deviationMin && indicators.deviationMax && {
    min: indicators.deviationMin,
    max: indicators.deviationMax
  }

  StatsIndicators.strengths            = this.data.strengths
  StatsIndicators.deviationPercentages = percentages
})

Template.statsIndicatorsDashboardDeviation.onDestroyed(function () {
  deviationSettings                    = null
  StatsIndicators.strengths            = null
  StatsIndicators.deviationPercentages = null
})

Template.statsIndicatorsDashboardDeviation.helpers({
  deviation: function () {
    if (deviationSettings) {
      var month     = moment(this.value, 'YYYYMM')
      var deviation = StatsIndicators.deviationFor(month)
      var cssClass  = 'success'

      if (deviation < deviationSettings.min) cssClass = 'danger'
      if (deviation > deviationSettings.max) cssClass = 'warning'

      return {
        value: deviation,
        class: deviation !== TAPi18n.__('no_data_abbr') && (cssClass + ' pointer-cursor')
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})

Template.statsIndicatorsDashboardDeviation.events({
  'click [data-details-for]': function (event, template) {
    var _month     = $(event.currentTarget).data('detailsFor')
    var month      = moment(_month, 'YYYYMM')
    var deviations = StatsIndicators.deviations(month, { unit: '' })
    var options    = { sort: { resistant: 1 } }
    var data       = {
      month:      month.format('MMMM YYYY').toUpperCase(),
      deviations: Strengths.find({}, options).map(function (strength) {
        var deviation = deviations[strength.resistant]

        return {
          strength:  strength.name,
          deviation: _.isNumber(deviation) ? deviation.toFixed(1) : deviation
        }
      })
    }

    Session.set('indicatorDetailsTemplateData', data)
    Session.set('indicatorDetailsTemplate', 'statsIndicatorsDashboardDeviationDetails')
  }
})
