Template.menu.events({
  'click a:not(.dropdown-toggle)': function () {
    $('.navbar-fixed-top .navbar-collapse.in').collapse('hide')
  },

  'click [data-logout]': function (event, template) {
    event.preventDefault()

    Meteor.logout(function () {
      Router.go('root')
    })
  }
})
