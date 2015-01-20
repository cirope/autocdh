Template.customerNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('customer_name_placeholder')
  },

  backPath: function () {
    var params = Router.current() && Router.current().params

    return params && params.sample_id ?
      Router.path('receiptNew', { sample_id: params.sample_id }) :
      Router.path('customers')
  },
})

AutoForm.addHooks('newCustomerForm', {
  before: {
    createCustomer: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
