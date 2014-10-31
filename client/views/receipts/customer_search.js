Template.customerSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('customer_search_placeholder')
  },

  settings: function () {
    var customersRule = {
      collection: Customers,
      field: 'name',
      matchAll: true,
      template: Template.customerPill,
      noMatchTemplate: Template.emptyCustomerPill,
      callback: function (customer) {
        $('[name="customerId"]').val(customer._id)
      }
    }

    return {
      limit: 10,
      rules: [customersRule]
    }
  }
})
