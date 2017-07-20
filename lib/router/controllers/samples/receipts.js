ReceiptNewController = RouteController.extend({
  action: function () {
    var receipt = Receipts.findOne({ sampleId: this.params.sample_id })

    if (receipt)
      this.redirect('receiptEdit', receipt)
    else
      this.render('receiptNew')
  },

  data: function () {
    return {
      sample: Samples.findOne(this.params.sample_id)
    }
  }
})

ReceiptController = RouteController.extend({
  data: function () {
    return Receipts.findOne(this.params._id)
  }
})
