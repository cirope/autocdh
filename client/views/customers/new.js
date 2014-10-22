Template.customerNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('customer_name_placeholder')
  }
})

AutoForm.addHooks('newCustomerForm', {
  before: {
    createCustomer: function (doc, template) {
      doc._id = Random.id()

      return doc
    }
  }
})
