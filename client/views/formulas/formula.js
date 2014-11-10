Template.formula.helpers({
  strength: function () {
    return Strengths.findOne(this.strengthId).name
  },

  settlement: function () {
    return Settlements.findOne(this.settlementId).name
  },

  aggregate: function () {
    return Aggregates.findOne(this.aggregateId).name
  },

  download: function () {
    return Downloads.findOne(this.downloadId).name
  }
})
