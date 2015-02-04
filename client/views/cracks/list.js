Template.cracksList.helpers({
  crackClass: function () {
    var crackedIn = moment(this.crackedIn)

    if (crackedIn.isSame())
      return 'success'
    else
      return crackedIn.isAfter() ? 'text-muted' : 'danger'
  },

  timeAfterMolding: function () {
    var days = moment().diff(this.moldingIn, 'days')

    return moment.localeData().relativeTime(days, false, days == 1 ? 'd' : 'dd')
  }
})
