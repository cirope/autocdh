loadAdditives = function () {
  if (Meteor.user() && ! Additives.find().count()) {
    Additives.insert({ name: 'Retardador',           unit: 'l/m³' })
    Additives.insert({ name: 'Acelerante',           unit: 'l/m³' })
    Additives.insert({ name: 'Hiperfluidificante',   unit: 'l/m³' })
    Additives.insert({ name: 'Incorporador de aire', unit: 'l/m³' })
    Additives.insert({ name: 'Hidrófugo',            unit: 'l/m³' })
    Additives.insert({ name: 'Fibras',               unit: 'l/m³' })
  }
}
