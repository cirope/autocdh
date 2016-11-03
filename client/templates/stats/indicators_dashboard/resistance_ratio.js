var resistanceRatioPercentages = null
var resistanceRatioSettings    = null
var strengths                  = null

var filterByMonth = function (cracks, month) {
  var count          = 0
  var filteredCracks = []
  var monthCracks    = _.filter(cracks, function (crack) {
    return month.isSame(crack.sample.date, 'month')
  })

  if (monthCracks.length) {
    _.each(cracks, function (crack) {
      var date      = crack.sample.date
      var isInMonth = month.isSame(date, 'month')
      var isNeeded  = monthCracks.length < 15 && count < 20 && month.isSameOrAfter(date)
      var dateDiff  = month.diff(date, 'days')
      var isInRange = dateDiff >= 0 && dateDiff <= 365

      if (isInMonth || (isNeeded && isInRange)) {
        filteredCracks.push(crack)

        count += 1
      }
    })
  }

  return filteredCracks
}

var resistanceRatios = function (month) {
  var values = {}

  _.each(strengths, function (data, resistant) {
    var cracks   = filterByMonth(data.cracks, month)
    var stresses = _.pluck(cracks, 'stress')

    if (stresses.length >= 5)
      values[resistant] = Stats.mean(stresses) / resistant
    else
      values[resistant] = TAPi18n.__('no_data_abbr')
  })

  return values
}

var distributionFor = function (month) {
  var distribution = {}
  var monthNumber  = +month.format('YYYYMM')
  var settings     = _.where(resistanceRatioPercentages, { month: monthNumber })
  var total        = Stats.sum(_.pluck(settings, 'value'))
  var isValid      = total >= 75 && settings.length === _.size(StatsIndicators.categoryLimits)

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

  return isValid && distribution
}

var resistanceRatioFor = function (month) {
  var resistanceRatio = null
  var lastValue       = null
  var values          = resistanceRatios(month)
  var distribution    = distributionFor(month)
  var filledValues    = StatsIndicators.fillTheBlanks(values)
  var allNumbers      = _.every(filledValues, function (v, __) {
    return _.isNumber(v)
  })

  if (allNumbers && distribution) {
    resistanceRatio = 0

    _.each(distribution, function (data, categoryName) {
      var stresses = _.filter(filledValues, function (__, resistant) {
        return data.match(resistant)
      })
      var mean     = stresses.length && Stats.mean(stresses) || lastValue || 0

      lastValue        = mean
      resistanceRatio += mean * data.proportion
    })
  }

  return _.isNumber(resistanceRatio) && resistanceRatio.toFixed(2) || TAPi18n.__('no_data_abbr')
}

Template.statsIndicatorsDashboardResistanceRatio.onCreated(function () {
  var qaSettings  = this.data.settings && this.data.settings.qa
  var indicators  = qaSettings && qaSettings.indicators
  var percentages = qaSettings && qaSettings.dispatchedPercentages

  if (! percentages || ! indicators) return

  strengths                  = this.data.strengths
  resistanceRatioPercentages = percentages
  resistanceRatioSettings    = indicators.resistanceRatioMin && indicators.resistanceRatioMax && {
    min: indicators.resistanceRatioMin,
    max: indicators.resistanceRatioMax
  }
})

Template.statsIndicatorsDashboardResistanceRatio.onDestroyed(function () {
  strengths                  = null
  resistanceRatioPercentages = null
  resistanceRatioSettings    = null
})

Template.statsIndicatorsDashboardResistanceRatio.helpers({
  resistanceRatio: function () {
    if (resistanceRatioSettings) {
      var month           = moment(this.value, 'YYYYMM')
      var resistanceRatio = resistanceRatioFor(month)
      var cssClass        = 'success'

      if (+resistanceRatio < resistanceRatioSettings.min) cssClass = 'danger'
      if (+resistanceRatio > resistanceRatioSettings.max) cssClass = 'warning'

      return {
        value: resistanceRatio,
        class: resistanceRatio !== TAPi18n.__('no_data_abbr') && (cssClass + ' pointer-cursor')
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})

Template.statsIndicatorsDashboardResistanceRatio.events({
  'click [data-details-for]': function (event, template) {
    var _month  = $(event.currentTarget).data('detailsFor')
    var month   = moment(_month, 'YYYYMM')
    var ratios  = resistanceRatios(month)
    var options = { sort: { resistant: 1 } }
    var data    = {
      month:      month.format('MMMM YYYY').toUpperCase(),
      ratios: Strengths.find({}, options).map(function (strength) {
        var ratio = ratios[strength.resistant]
        var mean  = ratio * strength.resistant

        return {
          strength: strength.name,
          mean:     isNaN(mean) ? TAPi18n.__('no_data_abbr') : mean.toFixed(1),
          ratio:    _.isNumber(ratio) ? ratio.toFixed(2) : ratio
        }
      })
    }

    Session.set('indicatorDetailsTemplateData', data)
    Session.set('indicatorDetailsTemplate', 'statsIndicatorsDashboardResistanceRatioDetails')
  }
})
