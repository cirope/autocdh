Template.concreteEdit.helpers({
  strengthOptions: function () {
    return Strengths.find().map(function (strength) {
      return { value: strength._id, label: strength.name }
    })
  },

  downloadOptions: function () {
    return Downloads.find().map(function (download) {
      return { value: download._id, label: download.name }
    })
  },

  aggregateOptions: function () {
    return Aggregates.find().map(function (aggregate) {
      return { value: aggregate._id, label: aggregate.name }
    })
  },

  settlementOptions: function () {
    return Settlements.find().map(function (settlement) {
      return { value: settlement._id, label: settlement.name }
    })
  },

  typeOptions: function () {
    return Types.find().map(function (type) {
      return { value: type._id, label: type.name }
    })
  },

  additiveOptions: function () {
    return Additives.find().map(function (additive) {
      return { value: additive._id, label: additive.name }
    })
  }
})
