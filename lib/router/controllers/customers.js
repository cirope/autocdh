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
