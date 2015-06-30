Template.samplesList.helpers({
  plant: function () {
    return this.plantId && Plants.findOne(this.plantId).name
  },

  moldingText: function () {
    return TAPi18n.__('sample_molding_' + this.molding)
  }
})
