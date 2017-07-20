Meteor.methods({
  updateRoles: function (userId, roles) {
    Roles.setUserRoles(userId, roles)
  }
})
