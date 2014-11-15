Template.concreteEdit.helpers({
  humidity: function () {
    return Humidities.findOne({ sampleId: this.sampleId })
  }
})
