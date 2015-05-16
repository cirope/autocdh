var mean = function (stresses) {
  var sum = _.reduce(stresses, function (memo, s) {
    return memo + s
  }, 0)

  return sum / stresses.length
}

var deviation = function (stresses) {
  var _mean         = mean(stresses)
  var deviations    = []
  var deviationsSum = 0

  _.each(stresses, function (s) {
    deviations.push(Math.pow(s - _mean, 2))
  })

  deviationsSum = _.reduce(deviations, function (memo, d) {
    return memo + d
  }, 0)

  return Math.sqrt(deviationsSum / (stresses.length - 1))
}

Template.statsDeviation.helpers({
  enoughStresses: function () {
    return this.stresses && this.stresses.length >= 15
  },

  meanResistance: function () {
    return mean(this.stresses)
  },

  standardDeviation: function () {
    return deviation(this.stresses)
  },

  resistance: function () {
    var _mean      = mean(this.stresses)
    var _deviation = deviation(this.stresses)

    return _mean - this.deviation * _deviation
  }
})
