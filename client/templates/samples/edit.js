Template.sampleEdit.helpers({
  receipt: function () {
    return Receipts.findOne({ sampleId: this._id })
  }
})
