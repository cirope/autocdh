loadSettlements = function () {
  if (Meteor.user() && ! Settlements.find().count()) {
    Settlements.insert({ name: '6 cm' })
    Settlements.insert({ name: '10 cm' })
    Settlements.insert({ name: '15 cm' })
  }
}
