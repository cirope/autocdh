var putCrack = function (row, crack) {
  row[TAPi18n.__('crack_designation')]  = crack.designation
  row[TAPi18n.__('responsible')]        = crack.responsibleId ? Responsible.findOne(crack.responsibleId).name : ''
  row[TAPi18n.__('crack_molding_in')]   = moment(crack.moldingIn).format('L')
  row[TAPi18n.__('crack_crack_in')]     = moment(crack.crackIn).format('L')
  row[TAPi18n.__('crack_other_assay')]  = crack.otherAssay ? TAPi18n.__('assay_other_assay_' + crack.otherAssay) : TAPi18n.__('no')

  var bendingTubeType = false
  var label = TAPi18n.__('no')
  if(crack.tubeType) {
    switch (crack.tubeType) {
      case '15x30':
        label = TAPi18n.__('assay_tube_type_15x30')
        break
      case '10x20':
        label = TAPi18n.__('assay_tube_type_10x20')
        break
      case 'bending':
        label = TAPi18n.__('assay_tube_type_bending')
        bendingTubeType = true
        break
      case 'other':
        label = TAPi18n.__('assay_tube_type_other')
        break
    }
  }
  row[TAPi18n.__('crack_tube_type')]    = label
  if(bendingTubeType){
      row[TAPi18n.__('crack_width')]    = crack.diameter + ' mm'
      row[TAPi18n.__('crack_height')]   = crack.height + ' mm'
      row[TAPi18n.__('crack_light')]    = crack.light + ' mm'
  } else {
      row[TAPi18n.__('crack_diameter')] = crack.diameter + ' mm'
      row[TAPi18n.__('crack_height')]       = crack.height + ' mm'
  }
  row[TAPi18n.__('crack_observations')] = crack.observations || ''
}

var putCrackedCrack = function (row, crack) {
  row[TAPi18n.__('crack_designation')]  = crack.designation
  row[TAPi18n.__('press')]              = crack.pressId ? Presses.findOne(crack.pressId).name : ''
  row[TAPi18n.__('responsible')]        = crack.responsibleId ? Responsible.findOne(crack.responsibleId).name : ''
  row[TAPi18n.__('crack_molding_in')]   = moment(crack.moldingIn).format('L')
  row[TAPi18n.__('crack_cracked_in')]   = moment(crack.crackedIn).format('L')
  row[TAPi18n.__('crack_other_assay')]  = crack.otherAssay ? TAPi18n.__('assay_other_assay_' + crack.otherAssay) : TAPi18n.__('no')


  var bendingTubeType = false
  var label = TAPi18n.__('no')
  if(crack.tubeType) {
    switch (crack.tubeType) {
        case '15x30':
            label = TAPi18n.__('assay_tube_type_15x30')
            break
        case '10x20':
            label = TAPi18n.__('assay_tube_type_10x20')
            break
        case 'bending':
            label = TAPi18n.__('assay_tube_type_bending')
            bendingTubeType = true
            break
        case 'other':
            label = TAPi18n.__('assay_tube_type_other')
            break
    }
  }
  row[TAPi18n.__('crack_tube_type')]    = label
  if(bendingTubeType){
      row[TAPi18n.__('crack_width')]    = crack.diameter + ' mm'
      row[TAPi18n.__('crack_height')]   = crack.height + ' mm'
      row[TAPi18n.__('crack_light')]    = crack.light + ' mm'
      row[TAPi18n.__('crack_load')]     = crack.load.toFixed(0)
      row[TAPi18n.__('crack_stress_bending')] = crack.stress.toFixed(1) + ' MPa'
  } else {
      row[TAPi18n.__('crack_diameter')] = crack.diameter + ' mm'
      row[TAPi18n.__('crack_height')]   = crack.height + ' mm'
      row[TAPi18n.__('crack_load')]     = crack.load.toFixed(0)
      row[TAPi18n.__('crack_stress')]   = crack.stress.toFixed(1) + ' MPa'
  }
  row[TAPi18n.__('crack_observations')] = crack.observations || ''
}

Template.cracksList.events({
  'click [data-download-csv]': function (event, template) {
    Tracker.nonreactive(function () {
      var data = Cracks.find({ stress: null }, { sort: { crackIn: 1 } }).map(function (crack) {
        row = {}

        putCrack(row, crack)

        return row
      })

      CSV.save(TAPi18n.__('cracks') + ' - ' + TAPi18n.__('crack_pending'), data)
    })
  }
})

Template.cracksCracked.events({
  'click [data-download-csv]': function (event, template) {
    Tracker.nonreactive(function () {
      var data = Cracks.find({ stress: { $ne: null } }, { sort: { crackedIn: 1 } }).map(function (crack) {
        row = {}

        putCrackedCrack(row, crack)

        return row
      })

      CSV.save(TAPi18n.__('cracks') + ' - ' + TAPi18n.__('crack_cracked'), data)
    })
  }
})
