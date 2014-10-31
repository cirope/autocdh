loadAdditives = function () {
  if (Meteor.user() && ! Additives.find().count()) {
    Additives.insert({ name: 'Ninguno' })
    Additives.insert({ name: 'Retardador' })
    Additives.insert({ name: 'Acelerante' })
    Additives.insert({ name: 'Hiperfluidificante' })
    Additives.insert({ name: 'Incorporador de aire' })
    Additives.insert({ name: 'Hidrófugo' })
    Additives.insert({ name: 'Fibras' })
  }
}
