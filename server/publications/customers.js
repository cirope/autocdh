Meteor.publish('customers', function () {
  return Customers.find({ userId: this.userId })
})
