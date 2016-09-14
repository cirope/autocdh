Template.graphics.helpers({
  customersPath: function () {
    if (Customers.find().count() === 1)
      return Router.path('customerCracks', Customers.findOne())
    else
      return Router.path('customers')
  }
})
