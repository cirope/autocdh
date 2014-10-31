Template.receiptEdit.helpers({
  customer: function () {
    return Customers.findOne(this.customerId).name
  },

  work: function () {
    return Works.findOne(this.workId).name
  },

  truck: function () {
    var truck = Trucks.findOne(this.truckId)

    return [truck.number, truck.driver].join(' | ')
  },

  surplusCommentClass: function () {
    return ! this.surplus && 'hidden'
  }
})

Template.receiptEdit.events({
  'change [name="surplus"]': function (event) {
    var selected = $(event.currentTarget).is(':checked')

    if (selected)
      $('[name="surplusComment"]').removeClass('hidden')
    else
      $('[name="surplusComment"]').addClass('hidden').val('')
  }
})
