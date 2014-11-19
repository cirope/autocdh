Template.crackEdit.helpers({
  sampleOptions: function () {
    var self      = this
    var cracks    = Cracks.find({}, { fields: { sampleId: 1 } })
    var sampleIds = cracks.map(function (crack) {
      if (self.sampleId !== crack.sampleId) return crack.sampleId
    })

    return Samples.find({ _id: { $nin: sampleIds } }).map(function (sample) {
      var date  = moment(sample.date).format(TAPi18n.__('datetime_default'))
      var plant = Plants.findOne(sample.plantId).name

      return { label: [date, plant].join(' | '), value: sample._id }
    })
  }
})
