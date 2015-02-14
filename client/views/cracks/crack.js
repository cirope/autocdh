var stressError = new ReactiveVar

Template.crack.helpers({
  showStressAverageInfo: function () {
    return this.crack && this.crack.stress && this.sibling && this.sibling.stress
  },

  stressAverage: function () {
    var avegare = (this.crack.stress + this.sibling.stress) / 2

    return avegare.toFixed(1)
  },

  stressError: function () {
    var diff  = Math.abs(this.crack.stress - this.sibling.stress)
    var sum   = this.crack.stress + this.sibling.stress
    var error = sum > 0 ? (diff / sum) * 100 : 0

    stressError.set(error)

    return stressError.get().toFixed(0)
  },

  stressErrorClass: function () {
    return stressError.get() > 15 ? 'text-danger' : 'text-muted'
  },

  stressErrorExceeded: function () {
    return this.sibling && stressError.get() > 15
  }
})
