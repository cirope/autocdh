Template.organization.helpers({
  image: function () {
    return Images.findOne(this.imageId)
  }
})

Template.organization.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeOrganization', template.data._id, function (error) {
        if (! error) Router.go('organizations')
      })
  }
})
