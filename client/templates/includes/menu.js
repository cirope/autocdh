Template.menu.helpers({
  showNav: function () {
    return Meteor.user() && ! Session.get('loading')
  }
})

Template.menu.events({
  'click a:not(.dropdown-toggle)': function () {
    $('.navbar-fixed-top .navbar-collapse.in').collapse('hide')
  }
})
