var deviationPercentages = null
var deviationSettings    = null
var strengths            = null
var categoryLimits       = {
  'lower_than_17': {
    min: 0,
    max: 16
  },
  '17_to_20': {
    min: 17,
    max: 20
  },
  '21_to_25': {
    min: 21,
    max: 25
  },
  '30_to_35': {
    min: 30,
    max: 35
  },
  'greater_than_35': {
    min: 36,
    max: 1000
  }
}

var filterByMonth = function (cracks, month) {
  var count          = 0
  var filteredCracks = []
  var monthHasCracks = _.some(cracks, function (crack) {
    return month.isSame(crack.sample.date, 'month')
  })

  if (monthHasCracks) {
    _.each(cracks, function (crack) {
      var date      = crack.sample.date
      var isInMonth = month.isSame(date, 'month')
      var isNeeded  = count < 20 && month.isSameOrAfter(date)
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

var deviations = function (month) {
  var values = {}

  _.each(strengths, function (data, resistant) {
    var cracks   = filterByMonth(data.cracks, month)
    var stresses = Stats.tenPercentCriteria(_.pluck(cracks, 'stress'))

    if (stresses.length >= 18)
      values[resistant] = Stats.deviation(stresses)
    else
      values[resistant] = TAPi18n.__('no_data_abbr')
  })

  return values
}

var distributionFor = function (month) {
  var distribution = {}
  var monthNumber  = +month.format('YYYYMM')
  var settings     = _.where(deviationPercentages, { month: monthNumber })
  var total        = Stats.sum(_.pluck(settings, 'value'))

  _.each(settings, function (setting) {
    var label  = TAPi18n.__('stats_indicators_strength_category_' + setting.type)
    var limits = categoryLimits[setting.type]

    distribution[label] = {
      percentage: setting.value,
      proportion: setting.value / total,
      match:      function (resistant) {
        return resistant >= limits.min && resistant <= limits.max
      }
    }
  })

  return settings.length == _.size(categoryLimits) && distribution
}

var fillTheBlanks = function (values) {
  var index        = 0
  var lastValue    = null
  var filledValues = {}

  _.each(values, function (value, resistant) {
    if (_.isNumber(value)) {
      filledValues[resistant] = lastValue = value
    } else if (index === 0) {
      lastValue = _.find(values, function (value, __) {
        return _.isNumber(value)
      })
      filledValues[resistant] = lastValue
    } else if (index + 1 === _.size(values)) {
      filledValues[resistant] = lastValue
    } else if (_.isNumber(lastValue)) {
      var _index    = -1
      var nextValue = _.find(values, function (v, __) {
        _index += 1

        return _.isNumber(v) && _index > index
      })
      var average   = (lastValue + nextValue) / 2

      if (_.isNumber(average) && ! isNaN(average))
        filledValues[resistant] = average
    }

    index += 1
  })

  return filledValues
}

var deviationFor = function (month) {
  var deviation    = null
  var values       = deviations(month)
  var distribution = distributionFor(month)
  var filledValues = fillTheBlanks(values)
  var allNumbers   = _.every(filledValues, function (v, __) {
    return _.isNumber(v)
  })

  if (allNumbers) {
    deviation = 0

    _.each(distribution, function (data, categoryName) {
      var stresses = _.filter(filledValues, function (__, resistant) {
        return data.match(resistant)
      })
      var mean     = stresses.length && Stats.mean(stresses) || 0

      deviation += mean * data.proportion
    })
  }

  return _.isNumber(deviation) && deviation.toFixed(1) || TAPi18n.__('no_data_abbr')
}

Template.statsIndicatorsDashboardDeviation.onCreated(function () {
  var qaSettings  = this.data.settings && this.data.settings.qa
  var indicators  = qaSettings && qaSettings.indicators
  var percentages = qaSettings && qaSettings.dispatchedPercentages

  if (! percentages || ! indicators) return

  strengths            = this.data.strengths
  deviationPercentages = percentages
  deviationSettings    = indicators.deviationMin && indicators.deviationMax && {
    min: indicators.deviationMin,
    max: indicators.deviationMax
  }
})

Template.statsIndicatorsDashboardDeviation.onDestroyed(function () {
  strengths            = null
  deviationPercentages = null
  deviationSettings    = null
})

Template.statsIndicatorsDashboardDeviation.helpers({
  deviation: function () {
    if (deviationSettings) {
      var month     = moment(this.value, 'YYYYMM')
      var deviation = deviationFor(month)
      var cssClass  = 'success'

      if (deviation < deviationSettings.min) cssClass = 'danger'
      if (deviation > deviationSettings.max) cssClass = 'warning'

      return {
        value: deviation,
        class: deviation !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
