Template.customerCracks.helpers({
  receipt: function () {
    return Receipts.findOne({ sampleId: this.sampleId })
  },

  work: function () {
    return this.workId && Works.findOne(this.workId).name
  },

  strength: function () {
    var concrete = Concretes.findOne({ sampleId: this.sampleId })
    var strength = concrete && Strengths.findOne(concrete.strengthId)

    return strength && strength.name
  },

  age: function () {
    var moldingIn = moment(this.moldingIn).endOf('day')
    var crackedIn = moment(this.crackedIn).endOf('day')
    var days      = crackedIn.diff(moldingIn, 'days')

    return moment.localeData().relativeTime(days, false, days === 1 ? 'd' : 'dd')
  }
})

Template.customerCracks.events({
  'click [data-action="search"]': function (event, template) {
    var molding = DateRangeHelper.getRange(template.$('#molding'))
    var cracked = DateRangeHelper.getRange(template.$('#cracked'))

    var search = {
      receipt:  template.$('#receipt').val(),
      work:     template.$('#work').val(),
      molding:  molding && molding.join('|'),
      cracked:  cracked && cracked.join('|'),
      strength: template.$('#strength').val(),
      age:      template.$('#age').val(),
      stress:   template.$('#stress').val()
    }

    Router.go('customerCracks', { _id: template.data.customer._id }, { query: search })
  },

  'click [data-search-clean]': function (event, template) {
    template.$('#search-filter').collapse('hide')
  },

  'shown.bs.collapse': function (event, template) {
    template.$('input:first').focus()

    template.$('#molding').
      daterangepicker(DateRangeHelper.filterOptions()).
      daterangepickerFilterEvents()
    template.$('#cracked').
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
