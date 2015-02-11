Template._concreteEdit.helpers({
  strengthOptions: function () {
    return Strengths.find({}, { sort: { createdAt: 1 } }).map(function (strength) {
      return { value: strength._id, label: strength.name }
    })
  },

  aggregateOptions: function () {
    return Aggregates.find({}, { sort: { createdAt: 1 } }).map(function (aggregate) {
      return { value: aggregate._id, label: aggregate.name }
    })
  },

  settlementOptions: function () {
    return Settlements.find({}, { sort: { createdAt: 1 } }).map(function (settlement) {
      return { value: settlement._id, label: settlement.name }
    })
  },

  additiveOptions: function () {
    return Additives.find({}, { sort: { createdAt: 1 } }).map(function (additive) {
      return { value: additive._id, label: additive.name }
    })
  }
})
