Template.granulometriesList.helpers({
  plant: function (plantId) {
    return plantId && Plants.findOne(plantId).name
  },

  material: function () {
    var materialId    = this.materialId
    var materialList  = Materials.first()
    var materials     = materialList && materialList[this.type + 's']
    var material      = _.findWhere(materials, { _id: materialId })

    return material && material.name
  },
})
