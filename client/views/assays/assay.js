Template.assay.helpers({
  ages: function () {
    return TAPi18n.__('assay_ages_' + this.ages)
  },

  cured: function () {
    return TAPi18n.__('assay_cured_' + this.cured)
  },

  otherAssay: function () {
    return this.otherAssay ?
      TAPi18n.__('assay_other_assay_' + this.otherAssay) :
      TAPi18n.__('no')
  },

  extended: function () {
    return TAPi18n.__(this.extended ? 'yes' : 'no')
  }
})
