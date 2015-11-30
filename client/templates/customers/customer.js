Template.customer.helpers({
  hasReceipts: function () {
    return Receipts.find({ customerId: this._id }).count()
  }
})

Template.customer.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeCustomer', template.data._id, function (error) {
        if (! error) Router.go('customers')
      })
  }
})
