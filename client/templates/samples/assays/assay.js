Template.assay.helpers({
  tubes: function () {
    var tubes = this.tubes.toString().replace('.', '-')

    return TAPi18n.__('assay_tubes_' + tubes)
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
