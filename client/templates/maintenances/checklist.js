var helpers = {
  name: function () {
    return Instruments.findOne(this.instrumentId).name
  }
}

Template.maintenanceChecklist1.helpers(helpers)
Template.maintenanceChecklist2.helpers(helpers)
Template.maintenanceChecklist3.helpers(helpers)
