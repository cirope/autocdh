Template.hardenedConcreteCracks.helpers({
  sample: function () {
    return Samples.findOne(this.sampleId).name
  }
})
