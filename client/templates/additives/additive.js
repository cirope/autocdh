Template.additive.helpers({
  hasConcretes: function () {
    return Concretes.find({ additiveId: this._id }).count()
  }
})

Template.additive.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeAdditive', template.data._id, function (error) {
        if (! error) Router.go('parameters')
      })
  }
})
