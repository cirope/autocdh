Template.crack.helpers({
  press: function () {
    return this.pressId && Presses.findOne(this.pressId).name
  },

  otherAssay: function () {
    return this.otherAssay ?
      TAPi18n.__('assay_other_assay_' + this.otherAssay) :
      TAPi18n.__('no')
  }
})
