CustomersController = RouteController.extend({
  data: function () {
    return { customers: Customers.find() }
  }
})

CustomerController = RouteController.extend({
  data: function () {
    return Customers.findOne(this.params._id)
  }
})
