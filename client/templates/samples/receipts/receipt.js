Template.receipt.helpers({
  customer: function () {
    return Customers.findOne(this.customerId).name
  },

  work: function () {
    return Works.findOne(this.workId).name
  },

  truck: function () {
    return Trucks.findOne(this.truckId).number
  },

  surplus: function () {
    var hasSurplus = TAPi18n.__(this.surplus ? 'yes' : 'no')

    return _.compact([hasSurplus, this.surplusComment]).join(': ')
  },

  receiptNumberLabel: function () {
    var settings = Settings.findOne()
    var customLabel = settings && settings.customOptions && settings.customOptions.receiptNumberLabel

    return customLabel || TAPi18n.__('receipt_number')
  }
})
