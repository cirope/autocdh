Template.receipt.helpers({
  customer: function () {
    return Customers.findOne(this.customerId).name
  },

  work: function () {
    return Works.findOne(this.workId).name
  },

  truck: function () {
    var truck = Trucks.findOne(this.truckId)

    return [truck.number, truck.driver].join(' | ')
  },

  surplus: function () {
    return [TAPi18n.__(this.surplus ? 'yes' : 'no'), this.surplusComment].join(': ')
  }
})