Template._concreteEdit.helpers({
  strengthOptions: function () {
    return Strengths.find({}, { sort: { name: 1 } }).map(function (strength) {
      return { value: strength._id, label: strength.name }
    })
  }
})
