Template.granulometryReference.helpers({
  showLimitCurves: function () {
    return Session.get('showLimitCurves')
  },

  sand: function () {
    return this.type === 'sand'
  }
})
