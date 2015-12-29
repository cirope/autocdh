Template.emptyCustomerPill.helpers({
  showNewOnEmpty: function () {
    var routeName = Router.current() && Router.current().route.getName()

    return routeName === 'receiptNew'
  }
})

Template.customerSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('customer_search_placeholder')
  },

  settings: function () {
    var customersRule = {
      collection:      Customers,
      field:           'name',
      matchAll:        true,
      template:        Template.customerPill,
      noMatchTemplate: Template.emptyCustomerPill
    }

    return {
      limit: 10,
      rules: [customersRule]
    }
  }
})

Template.customerSearch.events({
  'autocompleteselect #customer-search': function (event, template, doc) {
    template.$('[name="customerId"]').val(doc && doc._id).trigger('change')
  },

  'change #customer-search': function (event, template) {
    if (! $(event.currentTarget).val().trim())
      template.$('[name="customerId"]').val('').trigger('change')
  }
})
