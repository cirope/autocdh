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
  },

  crackTubeType: function () {
    return this.tubeType ?
        this.tubeType === 'bending' ?
            TAPi18n.__('assay_tube_type_bending') :
            this.tubeType === 'other' ?
                TAPi18n.__('assay_tube_type_other') :
                this.tubeType
        : TAPi18n.__('no')
  },

  diameterLabel: function () {
    return this.tubeType === 'bending' ?
            TAPi18n.__('crack_width') :
            TAPi18n.__('crack_diameter')
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
