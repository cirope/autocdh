Template.samplesList.helpers({
  plant: function (plantId) {
    return Plants.findOne(plantId).name
  },

  moldingText: function (molding) {
    var moldings = {
      plant:  TAPi18n.__('sample_molding_plant'),
      work:   TAPi18n.__('sample_molding_work'),
      remote: TAPi18n.__('sample_molding_remote')
    }

    return moldings[molding]
  }
})
