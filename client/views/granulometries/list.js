Template.granulometriesList.helpers({
  plant: function (plantId) {
    return Plants.findOne(plantId).name
  }
})
