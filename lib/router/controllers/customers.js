CustomersController = RouteController.extend({
  data: function () {
    return { customers: Customers.find() }
  }
})

CustomerController = RouteController.extend({
  data: function () {
    return {
      customer: Customers.findOne(this.params._id),
      works:    Works.find({ customerId: this.params._id })
    }
  }
})
