Template.menuUser.helpers({
  organizationImage: function () {
    var organization = Organizations.findOne(Meteor.user().profile.organizationId)

    return organization && Images.findOne(organization.imageId)
  }
})

Template.menuUser.events({
  'click [data-logout]': function (event, template) {
    event.preventDefault()

    Meteor.logout(function () {
      Router.go('root')
    })
  }
})
