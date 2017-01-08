Template.cracksCracked.helpers({
  strength: function () {
    var concrete = Concretes.findOne({ sampleId: this.sampleId })
    var strength = concrete && Strengths.findOne(concrete.strengthId)

    return strength && strength.name
  },
  customer: function () {
    var receipt = Receipts.findOne({ sampleId: this.sampleId })

    return receipt && Customers.findOne(receipt.customerId).name
  }
})

Template.cracksCracked.events({
  'click [data-action="search"]': function (event, template) {
    var moldingIn = DateRangeHelper.getRange(template.$('#molding-in'))
    var crackedIn = DateRangeHelper.getRange(template.$('#cracked-in'))

    var search = {
      designation: template.$('#designation').val(),
      customer:    template.$('#customer').val(),
      moldingIn:   moldingIn && moldingIn.join('|'),
      crackedIn:   crackedIn && crackedIn.join('|'),
      strength:    template.$('#strength').val(),
      stress:      template.$('#stress').val()
    }

    Router.go('cracksCracked', {}, { query: search })
  },

  'click [data-search-clean]': function (event, template) {
    template.$('#search-filter').collapse('hide')
  },

  'shown.bs.collapse': function (event, template) {
    template.$('input:first').focus()

    template.$('#molding-in').
      daterangepicker(DateRangeHelper.filterOptions()).
      daterangepickerFilterEvents()
    template.$('#cracked-in').
      daterangepicker(DateRangeHelper.filterOptions()).
      daterangepickerFilterEvents()

    template.$('[data-search-clean]').removeClass('hidden')
    template.$('[data-search]').addClass('hidden')
  },

  'hidden.bs.collapse': function (event, template) {
    template.$('[data-search-clean]').addClass('hidden')
    template.$('[data-search]').removeClass('hidden')
    template.$('input').val('')
  }
})
