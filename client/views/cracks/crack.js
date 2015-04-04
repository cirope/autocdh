var stressErrorExceeded = function () {
  return this.crack.error > 15
}

Template.crack.helpers({
  showStressAverageInfo: function () {
    return this.crack && this.crack.error && this.sibling
  },

  stressPanelClass: function () {
    return stressErrorExceeded.apply(this) ? 'panel-danger' : 'panel-default'
  },

  stressAverage: function () {
    var avegare = (this.crack.stress + this.sibling.stress) / 2

    return avegare.toFixed(1)
  },

  stressError: function () {
    return this.crack.error.toFixed(0)
  },

  stressErrorClass: function () {
    return stressErrorExceeded.apply(this) ? 'text-danger' : 'text-muted'
  },

  stressErrorExceeded: stressErrorExceeded
})
