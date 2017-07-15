Template.menuUser.helpers({
  organizationImage: function () {
    var user         = Meteor.user()
    var organization = user && Organizations.findOne(user.profile.organizationId)

    return organization && Images.findOne(organization.imageId)
  }
})

Template.menuUser.events({
  'click [data-logout]': function (event, template) {
    event.preventDefault()

    Session.set('loading', true)

    Meteor.logout(function () {
      Router.go('root')
      Session.set('loading')
    })
  }
})
