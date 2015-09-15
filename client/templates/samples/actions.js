var sample = function (sample) {
  return [
    TAPi18n.__('plant')              + ': ' + Plants.findOne(sample.plantId).name,
    TAPi18n.__('responsible')        + ': ' + Responsible.findOne(sample.responsibleId).name,
    TAPi18n.__('sample_molding')     + ': ' + TAPi18n.__('sample_molding_' + sample.molding),
    TAPi18n.__('sample_date')        + ': ' + moment(sample.date).format('LL'),
    TAPi18n.__('sample_temperature') + ': ' + (sample.temperature ? sample.temperature + ' °C' : '-'),
    TAPi18n.__('sample_humidity')    + ': ' + (sample.humidity ? sample.humidity + '%' : '-')
  ]
}

var receipt = function (receipt) {
  return [
    TAPi18n.__('customer')        + ': ' + Customers.findOne(receipt.customerId).name,
    TAPi18n.__('work')            + ': ' + Works.findOne(receipt.workId).name,
    TAPi18n.__('truck')           + ': ' + Trucks.findOne(receipt.truckId).number,
    TAPi18n.__('truck_driver')    + ': ' + receipt.truckDriver,
    TAPi18n.__('receipt_number')  + ': ' + receipt.number,
    TAPi18n.__('receipt_volume')  + ': ' + receipt.volume,
    TAPi18n.__('receipt_surplus') + ': ' + _.compact([
      TAPi18n.__(receipt.surplus ? 'yes' : 'no'),
      receipt.surplusComment
    ]).join(': ')
  ]
}

var concrete = function (concrete) {
  var additive  = Additives.findOne(concrete.additiveId)
  var aggregate = concrete.aggregateId && Aggregates.findOne(concrete.aggregateId)
  var materials = Materials.first() || {}
  var result    = [
    TAPi18n.__('strength')   + ': ' + Strengths.findOne(concrete.strengthId).name,
    TAPi18n.__('download')   + ': ' + TAPi18n.__('download_' + concrete.download),
    TAPi18n.__('aggregate')  + ': ' + (aggregate && aggregate.name),
    TAPi18n.__('settlement') + ': ' + Settlements.findOne(concrete.settlementId).name,
  ]

  if (additive)
    result.push(TAPi18n.__('additive') + ': ' + additive.name + '(' + +concrete.additiveAmount + ' ' + additive.unit + ')')

  result.push(TAPi18n.__('concrete_water') + ': ' + concrete.water + ' l/m³')

  if (concrete.reducer)
    result.push(TAPi18n.__('concrete_reducer') + ': ' + concrete.reducer + ' kg/m³')

  result.push(TAPi18n.__('concrete_dosages'))

  concrete.concretes.forEach(function (c) {
    var _concrete   = _.find(materials.concretes, function (mConcrete) {
      return mConcrete._id === c.id
    })

    result.push("\t- " + _concrete.name + ': ' + c.amount + ' kg/m³')
  })

  concrete.sands.forEach(function (s) {
    var _sand   = _.find(materials.sands, function (mSand) {
      return mSand._id === s.id
    })

    result.push("\t- " + _sand.name + ': ' + s.amount + ' kg/m³ (' + s.absorption + '%)')
  })

  concrete.gravels.forEach(function (g) {
    var _gravel   = _.find(materials.gravels, function (mGravel) {
      return mGravel._id === g.id
    })

    result.push("\t- " + _gravel.name + ': ' + g.amount + ' kg/m³ (' + g.absorption + '%)')
  })

  return result
}

var concreteBrief = function (concrete) {
  var aggregate = concrete.aggregateId && Aggregates.findOne(concrete.aggregateId)
  var result    = [
    TAPi18n.__('strength')  + ': ' + Strengths.findOne(concrete.strengthId).name,
    TAPi18n.__('aggregate') + ': ' + (aggregate && aggregate.name)
  ]

  return result
}

var humidity = function (humidity) {
  var ice       = (humidity.hasIce && humidity.ice) && humidity.ice + ' kg/m³'
  var ratio     = humidity.inTruck ? TAPi18n.__('humidity_cannot_calculate_ratio') : humidity.ratio
  var materials = Materials.first() || {}
  var result    = [
    TAPi18n.__('humidity_incorporated') + ': ' + humidity.incorporated + ' l/m³',
    TAPi18n.__('humidity_ice')          + ': ' + (ice || TAPi18n.__('no')),
    TAPi18n.__('humidity_in_truck')     + ': ' + TAPi18n.__(humidity.inTruck ? 'yes' : 'no'),
    TAPi18n.__('humidity_aggregates')
  ]

  humidity.hSands.forEach(function (s) {
    var _sand    = _.find(materials.sands, function (mSand) {
      return mSand._id === s.id
    })

    result.push("\t- " + _sand.name + ': ' + s.amount + ' kg/m³ (' + s.absorption + '%)')
  })

  humidity.hGravels.forEach(function (g) {
    var _gravel    = _.find(materials.gravels, function (mGravel) {
      return mGravel._id === g.id
    })

    result.push("\t- " + _gravel.name + ': ' + g.amount + ' kg/m³ (' + g.absorption + '%)')
  })

  result.push(TAPi18n.__('humidity_ratio') + ': ' + ratio)

  return result
}

var assay = function (assay) {
  var otherAssay = assay.otherAssay ? TAPi18n.__('assay_other_assay_' + assay.otherAssay) : TAPi18n.__('no')

  return [
    TAPi18n.__('assay_settlement')   + ': ' + assay.settlement + ' cm',
    TAPi18n.__('assay_extended')     + ': ' + TAPi18n.__(assay.extended ? 'yes' : 'no'),
    TAPi18n.__('assay_designation')  + ': ' + assay.designation,
    TAPi18n.__('assay_tubes')        + ': ' + TAPi18n.__('assay_tubes_' + assay.tubes),
    TAPi18n.__('assay_cured')        + ': ' + TAPi18n.__('assay_cured_' + assay.cured),
    TAPi18n.__('assay_temperature')  + ': ' + assay.temperature + ' °C',
    TAPi18n.__('assay_air')          + ': ' + (assay.air ? assay.air + '%' : ''),
    TAPi18n.__('assay_weight')       + ': ' + (assay.weight ? assay.weight + ' kg/m³' : ''),
    TAPi18n.__('assay_harden_time')  + ': ' + (assay.hardenTime ? moment(assay.hardenTime).format('HH:mm') : ''),
    TAPi18n.__('assay_other_assay')  + ': ' + otherAssay,
    TAPi18n.__('assay_observations') + ': ' + (assay.observations || '')
  ]
}

var cracks = function (cracks) {
  var lines  = []
  var format = TAPi18n.__('datetime_default')

  cracks.forEach(function (crack) {
    var sibling = Cracks.siblingOf(crack)

    lines.push(TAPi18n.__('press')            + ': ' + (crack.pressId && Presses.findOne(crack.pressId).name || ''))
    lines.push(TAPi18n.__('responsible')      + ': ' + (crack.responsibleId && Responsible.findOne(crack.responsibleId).name || ''))
    lines.push(TAPi18n.__('crack_molding_in') + ': ' + moment(crack.moldingIn).format(format))

    if (crack.stress)
      lines.push(TAPi18n.__('crack_cracked_in') + ': ' + moment(crack.crackedIn).format(format))
    else
      lines.push(TAPi18n.__('crack_crack_in')   + ': ' + moment(crack.crackIn).format(format))

    lines.push(TAPi18n.__('crack_other_assay') + ': ' +
      (crack.otherAssay ?  TAPi18n.__('assay_other_assay_' + crack.otherAssay) : TAPi18n.__('no'))
    )

    lines.push(TAPi18n.__('crack_tube_type')    + ': ' + (crack.tubeType || ''))
    lines.push(TAPi18n.__('crack_diameter')     + ': ' + (crack.diameter || '') + ' mm')
    lines.push(TAPi18n.__('crack_height')       + ': ' + (crack.height || '') + ' mm')
    lines.push(TAPi18n.__('crack_load')         + ': ' + (crack.load && crack.load.toFixed(0) || ''))
    lines.push(TAPi18n.__('crack_stress')       + ': ' + (crack.stress && crack.stress.toFixed(1) || '') + ' MPa')

    if (crack.stress && sibling && sibling.stress)
      lines.push(TAPi18n.__('crack_stress_average') + ': ' + (((crack.stress + sibling.stress) / 2).toFixed(1) + ' MPa') || '-')

    lines.push(TAPi18n.__('crack_stress_error') + ': ' + (crack.error && (crack.error.toFixed(0) + '%') || '-'))
    lines.push(TAPi18n.__('crack_observations') + ': ' + (crack.observations || '-'))

    lines.push('')
  })

  return lines
}

Template.sample.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeSample', template.data.sample._id, function (error) {
        if (! error) Router.go('samples')
      })
  },

  'click [data-download-pdf]': function (event, template) {
    var data          = template.data
    var doc           = new jsPDF
    var sampleLines   = sample(data.sample)
    var receiptLines  = data.sampleReceipt  ? receipt(data.sampleReceipt)   : ['-']
    var concreteLines = data.sampleConcrete ? concrete(data.sampleConcrete) : ['-']
    var humidityLines = data.sampleHumidity ? humidity(data.sampleHumidity) : ['-']
    var assayLines    = data.sampleAssay    ? assay(data.sampleAssay)       : ['-']
    var yPosition     = 20

    doc
      .setFont('helvetica')
      .setFontSize(14)
      .text(TAPi18n.__('sample') + ': ' + data.sample.name, 20, yPosition)
      .setFontSize(11)
      .text(sampleLines, 25, yPosition += 7)
      .setFontSize(14)
      .text(TAPi18n.__('receipt'), 20, yPosition += sampleLines.length * 4.5 + 2)
      .setFontSize(11)
      .text(receiptLines, 25, yPosition += 7)
      .setFontSize(14)
      .text(TAPi18n.__('concrete'), 20, yPosition += receiptLines.length * 4.5 + 2)
      .setFontSize(11)
      .text(concreteLines, 25, yPosition += 7)
      .setFontSize(14)
      .text(TAPi18n.__('humidity'), 20, yPosition += concreteLines.length * 4.5 + 2)
      .setFontSize(11)
      .text(humidityLines, 25, yPosition += 7)
      .setFontSize(14)
      .text(TAPi18n.__('assay'), 20, yPosition += humidityLines.length * 4.5 + 2)
      .setFontSize(11)
      .text(assayLines, 25, yPosition += 7)

    doc.save(data.sample.name + '.pdf')
  },

  'click [data-download-cracks-pdf]': function (event, template) {
    var data          = template.data
    var doc           = new jsPDF
    var sampleLines   = sample(data.sample)
    var receiptLines  = data.sampleReceipt        ? receipt(data.sampleReceipt)        : ['-']
    var concreteLines = data.sampleConcrete       ? concreteBrief(data.sampleConcrete) : ['-']
    var assayLines    = data.sampleAssay          ? assay(data.sampleAssay)            : ['-']
    var crackLines    = data.sampleCracks.count() ? cracks(data.sampleCracks)          : ['-']
    var yPosition     = 20

    doc
      .setFont('helvetica')
      .setFontSize(14)
      .text(TAPi18n.__('sample') + ': ' + data.sample.name, 20, yPosition)
      .setFontSize(11)
      .text(sampleLines, 25, yPosition += 7)
      .setFontSize(14)
      .text(TAPi18n.__('receipt'), 20, yPosition += sampleLines.length * 4.5 + 2)
      .setFontSize(11)
      .text(receiptLines, 25, yPosition += 7)
      .setFontSize(14)
      .text(TAPi18n.__('concrete'), 20, yPosition += receiptLines.length * 4.5 + 2)
      .setFontSize(11)
      .text(concreteLines, 25, yPosition += 7)
      .setFontSize(14)
      .text(TAPi18n.__('assay'), 20, yPosition += concreteLines.length * 4.5 + 2)
      .setFontSize(11)
      .text(assayLines, 25, yPosition += 7)
      .setFontSize(14)
      .text(TAPi18n.__('cracks'), 20, yPosition += assayLines.length * 4.5 + 2)
      .setFontSize(11)

    yPosition += 2

    _.each(crackLines, function (line) {
      if (yPosition > 270) {
        yPosition = 20

        doc.addPage()
      }

      doc.text(line, 25, yPosition += 4.5)
    })

    doc.save(data.sample.name + ' - ' + TAPi18n.__('cracks') + '.pdf')
  }
})