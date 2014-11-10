Template.formulasList.helpers({
  strength: function (strengthId) {
    return Strengths.findOne(strengthId).name
  },

  settlement: function (settlementId) {
    return Settlements.findOne(settlementId).name
  },

  aggregate: function (aggregateId) {
    return Aggregates.findOne(aggregateId).name
  },

  download: function (downloadId) {
    return Downloads.findOne(downloadId).name
  }
})
