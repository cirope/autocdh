Template.granulometriesList.helpers({
  plant: function (plantId) {
    return plantId && Plants.findOne(plantId).name
  }
})
