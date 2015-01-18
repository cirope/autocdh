AutoForm.addHooks('newReceiptForm', {
  before: {
    createReceipt: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
