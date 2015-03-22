publish = function (collection, options) {
  var user = Meteor.users.findOne(this.userId) || { profile: {} }

  return collection.find({ organizationId: user.profile.organizationId }, options)
}
