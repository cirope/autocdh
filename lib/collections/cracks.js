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
    var userId         = this.userId
    var sample         = Samples.findOne(assay.sampleId)
    var dimensions     = _.map(assay.tubeType.split('x'), function (d) {
      return +d * 10
    })

    var crackSchedules = {
      2:  [28, 28],
      3:  [7, 28, 28],
      4:  [3, 7, 28, 28],
      16: [1, 1, 3, 3, 7, 7, 14, 14, 28, 28, 90, 90, 180, 180, 365, 365]
    }

    _.each(crackSchedules[assay.tubes], function (days) {
      var crackDate = moment(sample.date).add(days, 'days').toDate()

      Cracks.insert({
        _id:           Random.id(),
        userId:        userId,
        sampleId:      sample._id,
        responsibleId: sample.responsibleId,
        designation:   assay.designation,
        tubeType:      assay.tubeType,
        diameter:      dimensions[0],
        height:        dimensions[1],
        moldingIn:     sample.date,
        crackIn:       crackDate,
        crackedIn:     crackDate,
        otherAssay:    assay.otherAssay
      })
    })
  },

  updateCrack: function (insertDoc, updateDoc, currentDoc) {
    var crack   = Cracks.findOne(currentDoc)
    var sibling = Cracks.siblingOf(crack)

    Cracks.update(crack._id, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        if (sibling && ! sibling.updatedAt)
          Router.go('crackEdit', crack)
        else
          Router.go('crack', crack)
      }, 100)
  }
})
