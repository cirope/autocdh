var download = function (csvString) {
  var blob   = new Blob(["\ufeff", csvString])
  var a      = window.document.createElement('a')

  a.href     = window.URL.createObjectURL(blob, { type: 'text/plain' })
  a.download = TAPi18n.__('samples') + '.csv'

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

var putSample = function (row, sample) {
  row[TAPi18n.__('sample_name')]        = sample.name
  row[TAPi18n.__('plant')]              = Plants.findOne(sample.plantId).name
  row[TAPi18n.__('responsible')]        = Responsible.findOne(sample.responsibleId).name
  row[TAPi18n.__('sample_molding')]     = TAPi18n.__('sample_molding_' + sample.molding)
  row[TAPi18n.__('sample_date')]        = moment(sample.date).format('L LT')
  row[TAPi18n.__('sample_temperature')] = (sample.temperature ? sample.temperature + ' °C' : '')
  row[TAPi18n.__('sample_humidity')]    = (sample.humidity ? sample.humidity + '%' : '')
}

var putReceipt = function (row, receipt) {
  var settings = Settings.findOne()
  var receiptCustomNumberLabel = settings && settings.customOptions && settings.customOptions.receiptNumberLabel

  row[TAPi18n.__('customer')] = Customers.findOne(receipt.customerId).name
  row[TAPi18n.__('work')]     = Works.findOne(receipt.workId).name

  if (settings && settings.customOptions && settings.customOptions.showStructure)
    row[TAPi18n.__('receipt_structure')] = receipt.structure

  row[TAPi18n.__('truck')]                                      = Trucks.findOne(receipt.truckId).number
  row[TAPi18n.__('truck_driver')]                               = receipt.truckDriver
  row[receiptCustomNumberLabel || TAPi18n.__('receipt_number')] = receipt.number
  row[TAPi18n.__('receipt_volume')]                             = receipt.volume ? receipt.volume + ' m³' : ''
  row[TAPi18n.__('receipt_surplus')]                            = _.compact([
    TAPi18n.__(receipt.surplus ? 'yes' : 'no'),
    receipt.surplusComment
  ]).join(': ')
}

var putConcrete = function (row, concrete) {
  var additive  = Additives.findOne(concrete.additiveId)
  var aggregate = concrete.aggregateId && Aggregates.findOne(concrete.aggregateId)
  var materials = Materials.first() || {}

  row[TAPi18n.__('strength')]         = Strengths.findOne(concrete.strengthId).name
  row[TAPi18n.__('download')]         = TAPi18n.__('download_' + concrete.download)
  row[TAPi18n.__('aggregate')]        = (aggregate && aggregate.name)
  row[TAPi18n.__('settlement')]       = Settlements.findOne(concrete.settlementId).name
  row[TAPi18n.__('additive')]         = additive ? additive.name + '(' + +concrete.additiveAmount + ' ' + additive.unit + ')' : ''

  row[TAPi18n.__('concrete_water')]   = concrete.water + ' l/m³'
  row[TAPi18n.__('concrete_reducer')] = concrete.reducer ? concrete.reducer + ' kg/m³' : ''

  var concretes = concrete.concretes.map(function (c) {
    var _concrete   = _.find(materials.concretes, function (mConcrete) {
      return mConcrete._id === c.id
    })

    return _concrete.name + ': ' + c.amount + ' kg/m³'
  }).join('; ')

  var sands = concrete.sands.map(function (s) {
    var _sand   = _.find(materials.sands, function (mSand) {
      return mSand._id === s.id
    })

    return _sand.name + ': ' + s.amount + ' kg/m³ (' + s.absorption + '%)'
  }).join('; ')

  var gravels = concrete.gravels.map(function (g) {
    var _gravel   = _.find(materials.gravels, function (mGravel) {
      return mGravel._id === g.id
    })

    return _gravel.name + ': ' + g.amount + ' kg/m³ (' + g.absorption + '%)'
  }).join('; ')

  row[TAPi18n.__('concrete_dosages')] = _.union(concretes, sands, gravels).join('; ')
}

var putHumidity = function (row, humidity) {
  var ice                = (humidity.hasIce && humidity.ice) && humidity.ice + ' kg/m³'
  var ratio              = humidity.inTruck ? TAPi18n.__('humidity_cannot_calculate_ratio') : humidity.ratio
  var additionalWater    = (humidity.hasAdditionalWater && humidity.additionalWater) && humidity.additionalWater + ' l/m³'
  var additionalAdditive = (humidity.hasAdditionalAdditive && humidity.additionalAdditive) && humidity.additionalAdditive + ' l/m³'
  var materials          = Materials.first() || {}

  if (humidity.additionalAdditiveId)
    additionalAdditive = additionalAdditive + ' (' + Additives.findOne(humidity.additionalAdditiveId).name + ')'

  row[TAPi18n.__('humidity_incorporated')]        = humidity.incorporated + ' l/m³'
  row[TAPi18n.__('humidity_ice')]                 = (ice || TAPi18n.__('no'))
  row[TAPi18n.__('humidity_in_truck')]            = TAPi18n.__(humidity.inTruck ? 'yes' : 'no')
  row[TAPi18n.__('humidity_additional_water')]    = additionalWater || TAPi18n.__('no')
  row[TAPi18n.__('humidity_additional_additive')] = additionalAdditive || TAPi18n.__('no')

  var sands = humidity.hSands.map(function (s) {
    var _sand    = _.find(materials.sands, function (mSand) {
      return mSand._id === s.id
    })

    return _sand.name + ': ' + s.amount + ' kg/m³ (' + s.absorption + '%)'
  }).join('; ')

  var gravels = humidity.hGravels.map(function (g) {
    var _gravel    = _.find(materials.gravels, function (mGravel) {
      return mGravel._id === g.id
    })

    return _gravel.name + ': ' + g.amount + ' kg/m³ (' + g.absorption + '%)'
  }).join('; ')

  row[TAPi18n.__('humidity_aggregates')] = _.union(sands, gravels).join('; ')
  row[TAPi18n.__('humidity_ratio')]      = ratio
}

var putAssay = function (row, assay) {
  var tubes      = assay.tubes.toString().replace('.', '-')
  var otherAssay = assay.otherAssay ? TAPi18n.__('assay_other_assay_' + assay.otherAssay) : TAPi18n.__('no')

  row[TAPi18n.__('assay_settlement')]   = assay.settlement + ' cm'
  row[TAPi18n.__('assay_extended')]     = TAPi18n.__(assay.extended ? 'yes' : 'no')
  row[TAPi18n.__('assay_designation')]  = assay.designation
  row[TAPi18n.__('assay_tubes')]        = TAPi18n.__('assay_tubes_' + tubes)
  row[TAPi18n.__('assay_cured')]        = TAPi18n.__('assay_cured_' + assay.cured)
  row[TAPi18n.__('assay_temperature')]  = (assay.temperature ? assay.temperature + ' °C' : '')
  row[TAPi18n.__('assay_air')]          = (assay.air ? assay.air + '%' : '')
  row[TAPi18n.__('assay_weight')]       = (assay.weight ? assay.weight + ' kg/m³' : '')
  row[TAPi18n.__('assay_other_assay')]  = otherAssay
  row[TAPi18n.__('assay_observations')] = (assay.observations || '')
}

Template.samplesList.events({
  'click [data-download-csv]': function (event, template) {
    Tracker.nonreactive(function () {
      var data = Samples.find({}, { sort: { date: 1 } }).map(function (sample) {
        var row      = null
        var selector = { sampleId: sample._id }
        var receipt  = Receipts.findOne(selector)
        var concrete = Concretes.findOne(selector)
        var humidity = Humidities.findOne(selector)
        var assay    = Assays.findOne(selector)

        if (receipt && concrete && humidity && assay) {
          row = {}

          putSample(row, sample)
          putReceipt(row, receipt)
          putConcrete(row, concrete)
          putHumidity(row, humidity)
          putAssay(row, assay)
        }

        return row
      })

      download(Papa.unparse(_.compact(data), { quotes: true, delimiter: ';' }))
    })
  }
})
