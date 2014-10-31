loadSettlements = function () {
  if (Meteor.user() && ! Settlements.find().count()) {
    Settlements.insert({ name: '6cm' })
    Settlements.insert({ name: '10cm' })
    Settlements.insert({ name: '15cm' })
  }
}
