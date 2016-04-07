Template.maintenanceStatus.helpers({
  instrument: function () {
    return Instruments.findOne(this.instrumentId).name
  }
})
