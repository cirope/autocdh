Template.concreteEdit.helpers({
  sample: function () {
    return Samples.findOne(this.sampleId)
  },

  humidity: function () {
    return Humidities.findOne({ sampleId: this.sampleId })
  }
})
