Template.customerCracks.helpers({
  receipt: function () {
    var receipt = Receipts.findOne({ sampleId: this.sampleId })

    return receipt && receipt.number
  },

  age: function () {
    var days = moment(this.crackedIn).diff(this.moldingIn, 'days')

    return moment.localeData().relativeTime(days, false, days === 1 ? 'd' : 'dd')
  }
})
