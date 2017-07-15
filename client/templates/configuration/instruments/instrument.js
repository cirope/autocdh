Template.instrument.helpers({
  calibratable: function () {
    return TAPi18n.__(this.calibratable ? 'yes' : 'no')
  },

  hasMaintenances: function () {
    return Maintenances.find({ instrumentId: this._id }).count()
  }
})

Template.instrument.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeInstrument', template.data._id, function (error) {
        if (! error) Router.go('instruments')
      })
  }
})
