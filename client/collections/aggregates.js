loadAggregates = function () {
  if (Meteor.user() && ! Aggregates.find().count()) {
    Aggregates.insert({ name: '6/20' })
    Aggregates.insert({ name: '6/12' })
    Aggregates.insert({ name: '6/30' })
  }
}
