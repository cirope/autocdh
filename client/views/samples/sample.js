Template.sample.helpers({
  sampleReceipt: function () {
    return Receipts.findOne({ sampleId: this._id })
  },

  sampleConcrete: function () {
    return Concretes.findOne({ sampleId: this._id })
  },

  sampleHumidity: function () {
    return Humidities.findOne({ sampleId: this._id })
  },

  sampleAssay: function () {
    return Assays.findOne({ sampleId: this._id })
  }
})
