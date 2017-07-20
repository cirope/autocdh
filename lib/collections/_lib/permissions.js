organizationIdFor = function (userId) {
  var user = Meteor.users.findOne(userId)

  return user && user.profile && user.profile.organizationId
}

ownsDocument = function (userId, document) {
  return document && document.organizationId === organizationIdFor(userId)
}
