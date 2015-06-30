Template.samplesList.helpers({
  plant: function (plantId) {
    return Plants.findOne(plantId).name
  },

  moldingText: function (molding) {
    return TAPi18n.__('sample_molding_' + molding)
  }
})
