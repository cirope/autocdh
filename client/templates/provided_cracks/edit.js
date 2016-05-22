Template.providedCrackEdit.helpers({
  work: function () {
    return Works.findOne(this.workId).name
  },

  customer: function () {
    return Customers.findOne(this.customerId).name
  }
})
