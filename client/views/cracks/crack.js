Template.crack.helpers({
  crackedInLabel: function () {
    return TAPi18n.__(this.updatedAt ? 'crack_cracked_in' : 'crack_cracked_in_estimated')
  },

  press: function () {
    return this.pressId && Presses.findOne(this.pressId).name
  },

  responsible: function () {
    return Responsible.findOne(this.responsibleId).name
  },

  otherAssay: function () {
    return this.otherAssay ?
      TAPi18n.__('assay_other_assay_' + this.otherAssay) :
      TAPi18n.__('no')
  }
})
