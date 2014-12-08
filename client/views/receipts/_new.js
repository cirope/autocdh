Template._receiptNew.events({
  'change [name="surplus"]': function (event) {
    var selected = $(event.currentTarget).is(':checked')

    if (selected)
      $('[name="surplusComment"]').removeClass('hidden')
    else
      $('[name="surplusComment"]').addClass('hidden').val('')
  }
})

AutoForm.addHooks('newReceiptForm', {
  before: {
    createReceipt: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
