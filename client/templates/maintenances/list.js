Template.maintenancesList.helpers({
  type: function () {
    return TAPi18n.__('maintenance_' + this.type)
  },

  displayWarning: function () {
    var warningDate = moment().add(15, 'days')

    return this.validUntil && warningDate.isAfter(this.validUntil)
  },

  labelClass: function () {
    var expired = moment().isAfter(this.validUntil)

    return expired ? 'label-danger' : 'label-warning'
  }
})
