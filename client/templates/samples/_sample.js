Template._sample.helpers({
  molding: function () {
    return this.molding && TAPi18n.__('sample_molding_' + this.molding)
  },

  plant: function () {
    return this.plantId && Plants.findOne(this.plantId).name
  },

  responsible: function () {
    return this.responsibleId && Responsible.findOne(this.responsibleId).name
  },

  temperature: function () {
    return this.temperature ? this.temperature + ' °C' : '-'
  },

  humidity: function () {
    return this.humidity ? this.humidity + '%' : '-'
  }
})
