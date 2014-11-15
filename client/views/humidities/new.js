Template.humidityNew.helpers({
  concrete: function () {
    return Concretes.findOne({ sampleId: this.sample._id })
  }
})
