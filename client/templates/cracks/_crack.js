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
    var label = TAPi18n.__('no')
    if(this.tubeType) {
      switch (this.tubeType) {
        case '15x30':
          label = TAPi18n.__('assay_tube_type_15x30')
          break
        case '10x20':
          label = TAPi18n.__('assay_tube_type_10x20')
          break
        case 'bending':
          label = TAPi18n.__('assay_tube_type_bending')
          break
        case 'other':
          label = TAPi18n.__('assay_tube_type_other')
          break
      }
    }
    return label
  },

  diameterLabel: function () {
    return this.tubeType && this.tubeType === 'bending' ?
            TAPi18n.__('crack_width') :
            TAPi18n.__('crack_diameter')
  },

  isBendingTubeType: function () {
    return this.tubeType && this.tubeType === 'bending'
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
