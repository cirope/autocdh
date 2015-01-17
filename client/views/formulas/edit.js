Template.formulaEdit.helpers({
  strengthOptions: function () {
    return Strengths.find({}, { sort: { createdAt: 1 } }).map(function (strength) {
      return { value: strength._id, label: strength.name }
    })
  },

  settlementOptions: function () {
    return Settlements.find({}, { sort: { createdAt: 1 } }).map(function (settlement) {
      return { value: settlement._id, label: settlement.name }
    })
  },

  aggregateOptions: function () {
    return Aggregates.find({}, { sort: { createdAt: 1 } }).map(function (aggregate) {
      return { value: aggregate._id, label: aggregate.name }
    })
  },

  downloadOptions: function () {
    return Downloads.find({}, { sort: { createdAt: 1 } }).map(function (download) {
      return { value: download._id, label: download.name }
    })
  }
})
