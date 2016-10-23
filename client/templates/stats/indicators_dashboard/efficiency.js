var efficiencyPercentages = null
var efficiencySettings    = null
var strengths             = null
var concretes             = null

var filterByMonth = function (cracks, month) {
  return _.filter(cracks, function (crack) {
    return month.isSame(crack.sample.date, 'month')
  })
}

var efficiencies = function (month) {
  var values = {}

  _.each(strengths, function (data, resistant) {
    var cracks   = filterByMonth(data.cracks, month)
    var stresses = _.pluck(cracks, 'stress')

    if (cracks.length) {
      values[resistant] = _.reduce(cracks, function (memo, c) {
        var _concretes     = _.findWhere(concretes, { sampleId: c.sampleId }).concretes
        var concreteAmount = Stats.sum(_.pluck(_concretes, 'amount'))

        return memo + c.stress / concreteAmount * 10
      }, 0) / cracks.length
    } else {
      values[resistant] = TAPi18n.__('no_data_abbr')
    }
  })

  return values
}

var distributionFor = function (month) {
  var distribution = {}
  var monthNumber  = +month.format('YYYYMM')
  var settings     = _.where(efficiencyPercentages, { month: monthNumber })
  var total        = Stats.sum(_.pluck(settings, 'value'))

  _.each(settings, function (setting) {
    var label  = TAPi18n.__('stats_indicators_strength_category_' + setting.type)
    var limits = StatsIndicators.categoryLimits[setting.type]

    distribution[label] = {
      percentage: setting.value,
      proportion: setting.value / total,
      match:      function (resistant) {
        return resistant >= limits.min && resistant <= limits.max
      }
    }
  })

  return settings.length === _.size(StatsIndicators.categoryLimits) && distribution
}

var efficiencyFor = function (month) {
  var efficiency = null
  var values          = efficiencies(month)
  var distribution    = distributionFor(month)
  var filledValues    = StatsIndicators.fillTheBlanks(values)
  var allNumbers      = _.every(filledValues, function (v, __) {
    return _.isNumber(v)
  })

  if (allNumbers) {
    efficiency = 0

    _.each(distribution, function (data, categoryName) {
      var stresses = _.filter(filledValues, function (__, resistant) {
        return data.match(resistant)
      })
      var mean     = stresses.length && Stats.mean(stresses) || 0

      efficiency += mean * data.proportion
    })
  }

  return _.isNumber(efficiency) && efficiency.toFixed(2) || TAPi18n.__('no_data_abbr')
}

Template.statsIndicatorsDashboardEfficiency.onCreated(function () {
  var qaSettings  = this.data.settings && this.data.settings.qa
  var indicators  = qaSettings && qaSettings.indicators
  var percentages = qaSettings && qaSettings.dispatchedPercentages

  if (! percentages || ! indicators) return

  strengths             = this.data.strengths
  concretes             = this.data.concretes
  efficiencyPercentages = percentages
  efficiencySettings    = indicators.efficiencyMin && indicators.efficiencyMax && {
    min: indicators.efficiencyMin,
    max: indicators.efficiencyMax
  }
})

Template.statsIndicatorsDashboardEfficiency.onDestroyed(function () {
  strengths             = null
  concretes             = null
  efficiencyPercentages = null
  efficiencySettings    = null
})

Template.statsIndicatorsDashboardEfficiency.helpers({
  efficiency: function () {
    if (efficiencySettings) {
      var month           = moment(this.value, 'YYYYMM')
      var efficiency = efficiencyFor(month)
      var cssClass        = 'success'

      if (efficiency < efficiencySettings.min) cssClass = 'danger'
      if (efficiency > efficiencySettings.max) cssClass = 'warning'

      return {
        value: efficiency,
        class: efficiency !== TAPi18n.__('no_data_abbr') && (cssClass + ' pointer-cursor')
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})

Template.statsIndicatorsDashboardEfficiency.events({
  'click [data-details-for]': function (event, template) {
    var _month        = $(event.currentTarget).data('detailsFor')
    var month         = moment(_month, 'YYYYMM')
    var _efficiencies = efficiencies(month)
    var data          = {
      month:        month.format('MMMM YYYY').toUpperCase(),
      efficiencies: Strengths.find().map(function (strength) {
        var efficiency = _efficiencies[strength.resistant]

        return {
          strength:   strength.name,
          efficiency: _.isNumber(efficiency) ? efficiency.toFixed(2) : efficiency
        }
      })
    }

    Session.set('indicatorDetailsTemplateData', data)
    Session.set('indicatorDetailsTemplate', 'statsIndicatorsDashboardEfficiencyDetails')
  }
})
