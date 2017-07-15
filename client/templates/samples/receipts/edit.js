Template.receiptEdit.helpers({
  sample: function () {
    return Samples.findOne(this.sampleId)
  }
})
