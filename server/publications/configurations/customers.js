Meteor.publish('customers', function () {
  return publish.call(this, Customers)
})
