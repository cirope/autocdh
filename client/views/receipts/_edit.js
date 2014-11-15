Template._receiptEdit.helpers({
  customer: function () {
    return Customers.findOne(this.receipt.customerId).name
  },

  work: function () {
    return Works.findOne(this.receipt.workId).name
  },

  truck: function () {
    var truck = Trucks.findOne(this.receipt.truckId)

    return [truck.number, this.receipt.truckDriver].join(' | ')
  },

  surplusCommentClass: function () {
    return ! this.surplus && 'hidden'
  }
})

Template._receiptEdit.events({
  'change [name="surplus"]': function (event) {
    var selected = $(event.currentTarget).is(':checked')

    if (selected)
      $('[name="surplusComment"]').removeClass('hidden')
    else
      $('[name="surplusComment"]').addClass('hidden').val('')
  }
})
