CustomersController = RouteController.extend({
  data: function () {
    return { customers: Customers.find({}, { sort: { name: 1 } }) }
  }
})

CustomerController = RouteController.extend({
  data: function () {
    return Customers.findOne(this.params._id)
  }
})

CustomerCracksController = RouteController.extend({
  data: function () {
    var customer      = Customers.findOne(this.params._id)
    var receipts      = customer && Receipts.find({ customerId: customer._id }, { fields: { sampleId: 1 } })
    var sampleIds     = receipts && _.pluck(receipts.fetch(), 'sampleId') || []
    var crackSelector = { sampleId: { $in: sampleIds }, crackedIn: { $ne: null }, stress: { $ne: null } }
    var cracks        = Cracks.find(crackSelector, { sort: { moldingIn: 1, crackedIn: -1 } })

    return {
      customer: customer,
      cracks:   cracks
    }
  }
})
