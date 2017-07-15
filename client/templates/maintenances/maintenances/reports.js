Template.maintenanceReports.helpers({
  disableMasterList: function () {
    return ! Maintenances.findOne({ active: true })
  },

  disableStatus: function () {
    return ! Maintenances.findOne({ active: true, type: 'calibratable' })
  },

  disablePreventive: function () {
    return ! Maintenances.findOne({ active: true })
  }
})
