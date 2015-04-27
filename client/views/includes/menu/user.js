Template.menuUser.events({
  'click [data-logout]': function (event, template) {
    event.preventDefault()

    Meteor.logout(function () {
      Router.go('root')
    })
  }
})
