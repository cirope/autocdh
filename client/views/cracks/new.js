Template.crackNew.helpers({
  sampleOptions: function () {
    var cracks    = Cracks.find({}, { fields: { sampleId: 1 } })
    var sampleIds = cracks.map(function (crack) { return crack.sampleId })

    return Samples.find({ _id: { $nin: sampleIds } }).map(function (sample) {
      var date  = moment(sample.date).format(TAPi18n.__('datetime_default'))
      var plant = Plants.findOne(sample.plantId).name

      return { label: [date, plant].join(' | '), value: sample._id }
    })
  }
})

AutoForm.addHooks('newCrackForm', {
  before: {
    createCrack: function (doc, template) {
      doc._id = Random.id()

      return doc
    }
  }
})
