Template._sample.helpers({
  molding: function () {
    return TAPi18n.__('sample_molding_' + this.molding)
  },

  plant: function () {
    return Plants.findOne(this.plantId).name
  },

  responsible: function () {
    return Responsible.findOne(this.responsibleId).name
  }
})
