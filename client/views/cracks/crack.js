Template.crack.helpers({
  sample: function () {
    var sample = Samples.findOne(this.sampleId)
    var date   = moment(sample.date).format(TAPi18n.__('datetime_default'))
    var plant  = Plants.findOne(sample.plantId).name

    return [date, plant].join(' | ')
  }
})
