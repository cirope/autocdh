Template.provider.helpers({
  hasGranulometries: function () {
    return Granulometries.find({ providerId: this._id }).count()
  }
})

Template.provider.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeProvider', template.data._id, function (error) {
        if (! error) Router.go('providers')
      })
  }
})
