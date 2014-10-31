loadTypes = function () {
  if (Meteor.user() && ! Types.find().count()) {
    Types.insert({ name: 'CPP40' })
  }
}
