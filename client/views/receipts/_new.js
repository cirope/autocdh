var receipt = new ReactiveVar({})
var save    = function () {
  receipt.set(AutoForm.getFormValues('newReceiptForm').insertDoc)
}

Template._receiptNew.helpers({
  receipt: function () {
    return receipt.get()
  },

  customer: function () {
    var customerId = receipt.get().customerId

    return customerId && Customers.findOne(customerId).name
  },

  work: function () {
    var workId = receipt.get().workId

    return workId && Works.findOne(workId).name
  },

  truck: function () {
    var truckId = receipt.get().truckId

    return truckId && Trucks.findOne(truckId).number
  }
})

Template._receiptNew.events({
  'click [data-new-customer]': function (event) {
    event.preventDefault()

    var params = Router.current() && Router.current().params

    save()
    AutoForm.resetForm('newReceiptForm')
    Router.go('receiptCustomerNew', { sample_id: params.sample_id })
  }
})

AutoForm.addHooks('newReceiptForm', {
  before: {
    createReceipt: function (doc, template) {
      if (AutoForm.validateForm('newReceiptForm')) receipt.set({})

      return _.extend(doc, { _id: Random.id() })
    }
  }
})
