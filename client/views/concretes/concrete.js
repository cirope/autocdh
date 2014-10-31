Template.concrete.helpers({
  strength: function () {
    return Strengths.findOne(this.strengthId).name
  },

  download: function () {
    return Downloads.findOne(this.downloadId).name
  },

  aggregate: function () {
    return Aggregates.findOne(this.aggregateId).name
  },

  settlement: function () {
    return Settlements.findOne(this.settlementId).name
  },

  type: function () {
    return Types.findOne(this.typeId).name
  },

  additive: function () {
    return Additives.findOne(this.additiveId).name
  }
})
