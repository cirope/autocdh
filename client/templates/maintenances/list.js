Template.maintenancesList.helpers({
  instrument: function () {
    return Instruments.findOne(this.instrumentId).name
  },

  displayWarning: function () {
    var warningDate = moment().add(15, 'days')

    return this.active && this.validUntil && warningDate.isAfter(this.validUntil)
  },

  labelClass: function () {
    var expired = moment().isAfter(this.validUntil)

    return expired ? 'label-danger' : 'label-warning'
  },

  date: function () {
    return this.date ? moment(this.date).format('L') : TAPi18n.__('maintenance_no_calibratable')
  }
})
