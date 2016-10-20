StatsIndicators = {
  categoryLimits: {
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
  },

  filterByMonth: function (cracks, month) {
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
  },

  deviations: function (month, options) {
    var values = {}

    _.each(this.strengths, function (data, resistant) {
      var cracks   = StatsIndicators.filterByMonth(data.cracks, month)
      var stresses = Stats.tenPercentCriteria(_.pluck(cracks, 'stress'))

      if (stresses.length >= 18) {
        var deviation     = Stats.deviation(stresses)
        var coefficient   = options && options.coefficient

        values[resistant] = coefficient ? deviation / resistant * 100 : deviation
      } else {
        values[resistant] = TAPi18n.__('no_data_abbr')
      }
    })

    return values
  },

  distributionFor: function (month) {
    var distribution = {}
    var monthNumber  = +month.format('YYYYMM')
    var settings     = _.where(this.deviationPercentages, { month: monthNumber })
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

    return settings.length == _.size(StatsIndicators.categoryLimits) && distribution
  },

  fillTheBlanks: function (values) {
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
  },

  _deviationFor: function (month, options) {
    var deviation    = null
    var values       = this.deviations(month, options)
    var distribution = this.distributionFor(month)
    var filledValues = this.fillTheBlanks(values)
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

    return _.isNumber(deviation) &&
      (deviation.toFixed(1) + options.unit) ||
      TAPi18n.__('no_data_abbr')
  },

  deviationFor: function (month) {
    return this._deviationFor(month, { unit: '' })
  },

  deviationCoefficientFor: function (month) {
    return this._deviationFor(month, { coefficient: true, unit: '%' })
  }
}
