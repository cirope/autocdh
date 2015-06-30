Template._crack.helpers({
  press: function () {
    return this.pressId && Presses.findOne(this.pressId).name
  },

  responsible: function () {
    return this.responsibleId && Responsible.findOne(this.responsibleId).name
  },

  otherAssay: function () {
    return this.otherAssay ?
      TAPi18n.__('assay_other_assay_' + this.otherAssay) :
      TAPi18n.__('no')
  }
})

Template._crack.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeCrack', template.data._id, function (error) {
        if (! error) Router.go('cracks')
      })
  }
})
