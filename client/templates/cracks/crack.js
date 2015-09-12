var stressErrorExceeded = function () {
  return this.cracks[0] && this.cracks[0].error > 15
}

Template.crack.helpers({
  showStressAverageInfo: function () {
    return this.cracks[0] && _.isNumber(this.cracks[0].error) && this.cracks[1]
  },

  stressPanelClass: function () {
    return stressErrorExceeded.apply(this) ? 'panel-danger' : 'panel-default'
  },

  stressAverage: function () {
    var sum     = _.reduce(this.cracks, function (memo, c) { return memo + c.stress }, 0)
    var average = sum / this.cracks.length

    return average.toFixed(1)
  },

  stressError: function () {
    return this.cracks[0].error.toFixed(0)
  },

  stressErrorClass: function () {
    return stressErrorExceeded.apply(this) ? 'text-danger' : 'text-muted'
  },

  stressErrorExceeded: stressErrorExceeded
})
