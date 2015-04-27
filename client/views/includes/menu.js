Template.menu.events({
  'click a:not(.dropdown-toggle)': function () {
    $('.navbar-fixed-top .navbar-collapse.in').collapse('hide')
  }
})
