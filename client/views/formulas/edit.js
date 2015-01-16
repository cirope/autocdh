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
  }
})
