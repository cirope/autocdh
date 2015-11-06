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
