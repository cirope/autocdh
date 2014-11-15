Template.humidityEdit.helpers({
  concrete: function () {
    return Concretes.findOne({ sampleId: this.sampleId })
  }
})
