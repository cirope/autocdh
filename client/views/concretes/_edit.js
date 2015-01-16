Template._concreteEdit.helpers({
  strengthOptions: function () {
    return Strengths.find({}, { sort: { name: 1 } }).map(function (strength) {
      return { value: strength._id, label: strength.name }
    })
  },

  downloadOptions: function () {
    return Downloads.find({}, { sort: { name: 1 } }).map(function (download) {
      return { value: download._id, label: download.name }
    })
  },

  aggregateOptions: function () {
    return Aggregates.find({}, { sort: { name: 1 } }).map(function (aggregate) {
      return { value: aggregate._id, label: aggregate.name }
    })
  },

  settlementOptions: function () {
    return Settlements.find({}, { sort: { name: 1 } }).map(function (settlement) {
      return { value: settlement._id, label: settlement.name }
    })
  }
})
