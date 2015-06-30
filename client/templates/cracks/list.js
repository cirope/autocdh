Template.cracksList.helpers({
  crackClass: function () {
    var crackIn = moment(this.crackIn)

    if (crackIn.isSame())
      return 'success'
    else
      return crackIn.isAfter() ? 'text-muted' : 'danger'
  },

  timeAfterMolding: function () {
    var days = moment().diff(this.moldingIn, 'days')

    return moment.localeData().relativeTime(days, false, days === 1 ? 'd' : 'dd')
  }
})
