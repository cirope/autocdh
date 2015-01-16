Template._sampleEdit.helpers({
  plantOptions: function () {
    return Plants.find({}, { sort: { name: 1 } }).map(function (plant) {
      return { value: plant._id, label: plant.name }
    })
  },

  responsibleOptions: function () {
    return Responsible.find({}, { sort: { name: 1 } }).map(function (responsible) {
      return { value: responsible._id, label: responsible.name }
    })
  }
})
