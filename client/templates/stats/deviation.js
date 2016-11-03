Template.statsDeviation.helpers({
  enoughStresses: function () {
    return this.stresses && this.stresses.length >= 15
  },

  meanResistance: function () {
    return Stats.mean(_.pluck(this.stresses, 'stress'))
  },

  standardDeviation: function () {
    return Stats.deviation(_.pluck(this.stresses, 'stress'))
  },

  resistance: function () {
    var stresses  = _.pluck(this.stresses, 'stress')
    var mean      = Stats.mean(stresses)
    var deviation = Stats.deviation(stresses)

    return mean - this.deviation * deviation
  },

  coefficient: function () {
    var stresses  = _.pluck(this.stresses, 'stress')
    var mean      = Stats.mean(stresses)
    var deviation = Stats.deviation(stresses)

    return deviation / mean * 100
  }
})
