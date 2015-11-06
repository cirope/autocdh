Template.customerCracks.helpers({
  receipt: function () {
    var receipt = Receipts.findOne({ sampleId: this.sampleId })

    return receipt && receipt.number
  },

  age: function () {
    var moldingIn = moment(this.moldingIn).endOf('day')
    var crackedIn = moment(this.crackedIn).endOf('day')
    var days      = crackedIn.diff(moldingIn, 'days')

    return moment.localeData().relativeTime(days, false, days === 1 ? 'd' : 'dd')
  }
})
