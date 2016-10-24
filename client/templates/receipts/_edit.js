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


Template._receiptEdit.events({
  /*
  'click [data-new-customer]': function (event) {
    event.preventDefault()

    var params = Router.current() && Router.current().params

    save()
    AutoForm.resetForm('newReceiptForm')
    Router.go('receiptCustomerNew', { sample_id: params.sample_id })
  },

*/
  'click [data-new-work]': function (event) {
    event.preventDefault()

    var params = Router.current() && Router.current().params
    console.log(">> "+JSON.stringify(params))

    save()
    AutoForm.resetForm('newReceiptForm')
    Router.go('receiptWorkNew', { sample_id: params.sample_id })
  },
/*
  'click [data-new-truck]': function (event) {
    event.preventDefault()

    var params = Router.current() && Router.current().params

    save()
    AutoForm.resetForm('newReceiptForm')
    Router.go('receiptTruckNew', { sample_id: params.sample_id })
  }
  */
})