publish = function (collection, selector, options) {
  var user      = Meteor.users.findOne(this.userId) || { profile: {} }
  var _selector = _.extend(_.clone(selector || {}), { organizationId: user.profile.organizationId })

  return collection.find(_selector, options)
}
