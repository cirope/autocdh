Cracks = new Ground.Collection(new Mongo.Collection('cracks'), { version: 1.0 })

Cracks.attachSchema(Schemas.Crack)

Cracks.allow({
  remove: ownsDocument
})

Meteor.methods({
  createCracks: function (assay) {
    var userId         = this.userId
    var sample         = Samples.findOne(assay.sampleId)
    var crackSchedules = {
      2:  [28, 28],
      3:  [7, 28, 28],
      4:  [3, 7, 28, 28],
      16: [1, 1, 3, 3, 7, 7, 14, 14, 28, 28, 90, 90, 180, 180, 365, 365]
    }

    _.each(crackSchedules[assay.tubes], function (days) {
      Cracks.insert({
        _id:         Random.id(),
        userId:      userId,
        sampleId:    sample._id,
        designation: assay.designation,
        moldingIn:   sample.date,
        crackedIn:   moment(sample.date).add(days, 'days').toDate(),
        otherAssay:  assay.otherAssay
      })
    })
  },

  updateCrack: function (insertDoc, updateDoc, currentDoc) {
    Cracks.update(currentDoc, updateDoc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('crack', { _id: currentDoc })
      }, 100)
  }
})
