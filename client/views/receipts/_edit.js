Template._receiptEdit.helpers({
  customer: function () {
    return Customers.findOne(this.receipt.customerId).name
  },

  work: function () {
    return Works.findOne(this.receipt.workId).name
  },

  truck: function () {
    return Trucks.findOne(this.receipt.truckId).number
  }
})
