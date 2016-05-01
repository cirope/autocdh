var defaultAdditives = [
  { name: 'Retardador',           unit: 'l/m³' },
  { name: 'Acelerante',           unit: 'l/m³' },
  { name: 'Hiperfluidificante',   unit: 'l/m³' },
  { name: 'Incorporador de aire', unit: 'l/m³' },
  { name: 'Hidrófugo',            unit: 'l/m³' },
  { name: 'Fibras',               unit: 'l/m³' }
]

var defaultInstruments = [
  { name: 'Moldes de probetas 15 x 30',                 calibratable: false, checklist: 1 },
  { name: 'Moldes de probetas 10 x 20',                 calibratable: false, checklist: 1 },
  { name: 'Moldes de probetas para flexión',            calibratable: false, checklist: 1 },
  { name: 'Conos de Abrams',                            calibratable: false, checklist: 1 },
  { name: 'Recipientes PUV (hormigón y agregados)',     calibratable: true,  checklist: 1 },
  { name: 'Equipo para aire incorporado (Washington)',  calibratable: true,  checklist: 2 },
  { name: 'Tamices para agregados',                     calibratable: false, checklist: 3 },
  { name: 'Instrumental para densidad de A. Fino',      calibratable: false, checklist: 1 },
  { name: 'Instrumental para densidad de A. Grueso',    calibratable: false, checklist: 1 },
  { name: 'Prensa de ensayos',                          calibratable: true,  checklist: 2 },
  { name: 'Discos metálicos para encabezado 15 cm',     calibratable: false, checklist: 1 },
  { name: 'Discos metálicos para encabezado 10 cm',     calibratable: false, checklist: 1 },
  { name: 'Crisol para fundir mortero de azufre',       calibratable: false, checklist: 2 },
  { name: 'Encabezador para mortero de azufre',         calibratable: false, checklist: 1 },
  { name: 'Esclerómetro para hormigones',               calibratable: true,  checklist: 2 },
  { name: 'Máquina extractora de testigos',             calibratable: false, checklist: 2 },
  { name: 'Balanza de brazos (Roverball)',              calibratable: false, checklist: 2 },
  { name: 'Balanzas digitales',                         calibratable: true,  checklist: 2 },
  { name: 'Termómetros analógicos',                     calibratable: false, checklist: 2 },
  { name: 'Termómetros digitales',                      calibratable: false, checklist: 2 },
  { name: 'Varillas de compactación 16 mm',             calibratable: false, checklist: 1 },
  { name: 'Varillas de compactación 10 mm',             calibratable: false, checklist: 1 },
  { name: 'Martillos con cabeza de goma',               calibratable: false, checklist: 1 },
  { name: 'Calibres de lajosidad y elongación',         calibratable: false, checklist: 1 },
  { name: 'Cintas métricas y reglas metálicas',         calibratable: false, checklist: 1 },
  { name: 'Calibres pie de rey',                        calibratable: true,  checklist: 1 },
  { name: 'Hormigonera de laboratorio',                 calibratable: false, checklist: 2 },
  { name: 'Penetrómetro para tiempos de fragüe',        calibratable: true,  checklist: 2 },
  { name: 'Partidor de Jones para agregados',           calibratable: false, checklist: 1 },
  { name: 'Termohigrómetros (condiciones ambientales)', calibratable: false, checklist: 2 },
  { name: 'Estufas u hornos para secado de muestras',   calibratable: false, checklist: 2 },
  { name: 'Equipo para permeabilidad de hormigones',    calibratable: false, checklist: 2 },
  { name: 'Equipo para Desgaste Los Ángeles',           calibratable: false, checklist: 2 },
  { name: 'Tamizadora automática',                      calibratable: false, checklist: 2 },
  { name: 'Equipo de ultrasonido',                      calibratable: false, checklist: 2 }
]

var defaultSettlements = [
  { name: '6 cm' },
  { name: '10 cm' },
  { name: '15 cm' }
]

Accounts.onLogin(function (info) {
  var user        = info.user
  var defaults    = { organizationId: user.profile.organizationId }
  var additives   = Additives.find(defaults)
  var instruments = Instruments.find(defaults)
  var settlements = Settlements.find(defaults)

  if (additives.count() === 0) {
    _.each(defaultAdditives, function (additive) {
      Additives.insert(_.extend(additive, defaults, { _id: Random.id() }))
    })
  }

  if (instruments.count() === 0) {
    _.each(defaultInstruments, function (instrument) {
      Instruments.insert(_.extend(instrument, defaults, { _id: Random.id() }))
    })
  }

  if (settlements.count() === 0) {
    _.each(defaultSettlements, function (settlement) {
      Settlements.insert(_.extend(settlement, defaults, { id: Random.id() }))
    })
  }
})
