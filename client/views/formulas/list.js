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

  downloadName: function (download) {
    return TAPi18n.__('download_' + download)
  }
})
