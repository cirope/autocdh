Template.assayEdit.helpers({
  sample: function () {
    return Samples.findOne(this.sampleId)
  }
})
