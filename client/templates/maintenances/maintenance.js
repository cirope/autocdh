Template.maintenance.helpers({
  instrument: function () {
    return Instruments.findOne(this.instrumentId).name
  },

  type: function () {
    return TAPi18n.__('maintenance_' + this.type)
  }
})
