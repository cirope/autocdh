var receipt = new ReactiveVar({})
var save    = function () {
  receipt.set(AutoForm.getFormValues('newReceiptForm').insertDoc)
}

Template._receiptNew.onRendered(function(){
  // restart receipt and truck driver when it started
  receipt = new ReactiveVar({})
  truckDriver = new ReactiveVar({})
})

Template._receiptNew.helpers({
  receipt: function () {
    var instance = receipt.get()

    //  use the sample name as receipt number if customOptions.copyReceiptNumberFromSample is enabled
    if(!this.disabled && this.sample && !instance.number){
      var settings = Settings.findOne()
      var copyReceiptNumberFromSample = settings && settings.customOptions && settings.customOptions.copyReceiptNumberFromSample

      if(copyReceiptNumberFromSample) {
        instance.number = this.sample.name
      }
    }
    return instance
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
  },

  'click [data-new-work]': function (event) {
    event.preventDefault()

    var params = Router.current() && Router.current().params

    save()
    AutoForm.resetForm('newReceiptForm')
    Router.go('receiptWorkNew', { sample_id: params.sample_id })
  },

  'click [data-new-truck]': function (event) {
    event.preventDefault()

    var params = Router.current() && Router.current().params

    save()
    AutoForm.resetForm('newReceiptForm')
    Router.go('receiptTruckNew', { sample_id: params.sample_id })
  }
})

AutoForm.addHooks('newReceiptForm', {
  before: {
    method: function (doc) {
      if (AutoForm.validateForm('newReceiptForm'))
        setTimeout(function () { receipt.set({}) }, 300)

      return _.extend(doc, { _id: Random.id() })
    }
  }
})
