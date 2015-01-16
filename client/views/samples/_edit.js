Template._sampleEdit.helpers({
  plantOptions: function () {
    return Plants.find({}, { sort: { name: 1 } }).map(function (plant) {
      return { value: plant._id, label: plant.name }
    })
  }
})
