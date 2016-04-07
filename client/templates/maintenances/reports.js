Template.maintenanceReports.helpers({
  disableStatus: function () {
    return ! Maintenances.findOne({ active: true, type: 'calibratable' })
  }
})
