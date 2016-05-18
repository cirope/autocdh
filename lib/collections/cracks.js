Cracks = new Ground.Collection(new Mongo.Collection('cracks'), { version: 1.0 })

Cracks.attachSchema(Schemas.Crack)

Cracks.allow({
  remove: ownsDocument
})

Cracks.siblingOf = function (crack) {
  return crack && Cracks.findOne({
    _id:       { $ne: crack._id },
    sampleId:  crack.sampleId,
    crackIn:   crack.crackIn
  })
}

Meteor.methods({
  createCracks: function (assay) {
    var sample         = Samples.findOne(assay.sampleId)
    var dimensions     = _.map(assay.tubeType.split('x'), function (d) {
      return +d * 10
    })

    var crackSchedules = {
      '1':    [4],
      '-1':   [7],
      '2':    [28, 28],
      '-2':   [7, 7],
      '2.1':  [56, 56],
      '-2.1': [90, 90],
      '3':    [7, 28, 28],
      '-3':   [4, 28, 28],
      '3.1':  [28, 56, 56],
      '4':    [3, 7, 28, 28],
      '-4':   [7, 7, 28, 28],
      '4.1':  [28, 28, 56, 56],
      '5':    [7, 28, 28, 90, 90],
      '-5':   [7, 28, 28, 56, 56],
      '5.1':  [3, 3, 7, 28, 28],
      '6':    [28, 28, 28, 56, 56, 56],
      '-6':   [28, 28, 56, 56, 90, 90],
      '6.1':  [7, 7, 28, 28, 56, 56],
      '16':   [1, 1, 3, 3, 7, 7, 14, 14, 28, 28, 90, 90, 180, 180, 365, 365]
    }

    _.each(crackSchedules[assay.tubes], function (days) {
      var crackDate = moment(sample.date).startOf('day').add(days, 'days').toDate()

      Cracks.insert({
        _id:            Random.id(),
        organizationId: sample.organizationId,
        sampleId:       sample._id,
        responsibleId:  sample.responsibleId,
        designation:    assay.designation,
        tubeType:       assay.tubeType,
        diameter:       dimensions[0],
        height:         dimensions[1],
        moldingIn:      sample.date,
        days:           days,
        crackIn:        crackDate,
        crackedIn:      crackDate,
        otherAssay:     assay.otherAssay
      })
    })
  },

  updateCrack: function (modifier, documentId) {
    var crack   = Cracks.findOne(documentId)
    var sibling = Cracks.siblingOf(crack)

    Cracks.update(documentId, modifier)

    if (sibling && sibling.stress) {
      var crack = Cracks.findOne(documentId)
      var diff  = Math.abs(crack.stress - sibling.stress)
      var sum   = crack.stress + sibling.stress
      var error = Math.round(sum > 0 ? (diff / sum) * 100 : 0)

      Cracks.update(crack._id,   { $set: { error: error } })
      Cracks.update(sibling._id, { $set: { error: error } })
    }

    if (this.isSimulation) {
      if (sibling && ! sibling.stress)
        Router.go('crackEdit', sibling)
      else
        Router.go('crack', crack)
    }
  },

  updateCracks: function (assay, previousTubes) {
    var sample     = Samples.findOne(assay.sampleId)
    var dimensions = _.map(assay.tubeType.split('x'), function (d) {
      return +d * 10
    })
    var cracks     = Cracks.find({
      organizationId: sample.organizationId,
      sampleId:       sample._id
    })

    if (assay.tubes === previousTubes) {
      var modifier = {
        $set: {
          designation: assay.designation,
          tubeType:    assay.tubeType,
          diameter:    dimensions[0],
          height:      dimensions[1],
          otherAssay:  assay.otherAssay
        }
      }

      cracks.forEach(function (c) { Cracks.update(c._id, modifier) })
    } else {
      cracks.forEach(function (c) { Cracks.remove(c._id) })

      Meteor.call('createCracks', assay)
    }
  },

  updateCracksDate: function (sampleId, previousDate) {
    var sample = Samples.findOne(sampleId)
    var assay  = Assays.findOne({ sampleId: sampleId })
    var cracks = Cracks.find({
      organizationId: sample.organizationId,
      sampleId:       sample._id
    })

    if (assay && ! moment(sample.date).isSame(previousDate, 'day')) {
      cracks.forEach(function (c) { Cracks.remove(c._id) })

      Meteor.call('createCracks', assay)
    }
  },

  removeCrack: function (documentId) {
    Cracks.remove(documentId)
  }
})
