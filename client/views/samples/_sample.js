Template._sample.helpers({
  molding: function () {
    var moldings = {
      plant:  TAPi18n.__('sample_molding_plant'),
      work:   TAPi18n.__('sample_molding_work'),
      remote: TAPi18n.__('sample_molding_remote')
    }

    return moldings[this.molding]
  },

  plant: function () {
    return Plants.findOne(this.plantId).name
  },

  responsible: function () {
    return Responsible.findOne(this.responsibleId).name
  }
})
