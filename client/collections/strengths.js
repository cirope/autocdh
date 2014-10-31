loadStrengths = function () {
  if (Meteor.user() && ! Strengths.find().count()) {
    Strengths.insert({ name: 'H-8' })
    Strengths.insert({ name: 'H-13' })
    Strengths.insert({ name: 'H-17' })
    Strengths.insert({ name: 'H-21' })
    Strengths.insert({ name: 'H-25' })
    Strengths.insert({ name: 'H-30' })
    Strengths.insert({ name: 'H-35' })
    Strengths.insert({ name: 'H-40' })
  }
}
