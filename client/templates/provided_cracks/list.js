var providedCrack = new ReactiveVar

Template.providedCracksList.helpers({
  providedCrack: function () {
    return providedCrack.get()
  },

  work: function () {
    return Works.findOne(this.workId).name
  },

  customer: function () {
    return Customers.findOne(this.customerId).name
  }
})

Template.providedCracksList.events({
  'click [data-download="pdf"]': function () {
    providedCrack.set(this)

    setTimeout(function () {
      $('[data-download-pdf]').click()
    }, 300)
  }
})
