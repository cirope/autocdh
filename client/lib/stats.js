Stats = {
  tenPercentCriteria: function (values) {
    var removeCount  = Math.round(values.length * 0.1)
    var mean         = this.mean(values)
    var sortFn       = function (value) { return Math.abs(value - mean) }
    var sortedValues = _.sortBy(values, sortFn)

    return _.initial(sortedValues, removeCount)
  },

  sum: function (values) {
    return _.reduce(values, function (memo, value) {
      return memo + value
    }, 0)
  },

  mean: function (values) {
    return this.sum(values) / values.length
  },

  deviation: function (values) {
    var mean          = this.mean(values)
    var deviationFn   = function (value) { return Math.pow(value - mean, 2) }
    var deviations    = _.map(values, deviationFn)
    var deviationsSum = this.sum(deviations)

    return Math.sqrt(deviationsSum / (values.length - 1))
  }
}
