Template.granulometryReference.helpers({
  showLimitCurves: function () {
    return this.type === 'sand' && Session.get('showLimitCurves')
  }
})
