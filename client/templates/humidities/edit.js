Template.humidityEdit.helpers({
  sample: function () {
    return Samples.findOne(this.sampleId)
  },

  concrete: function () {
    return Concretes.findOne({ sampleId: this.sampleId })
  }
})
