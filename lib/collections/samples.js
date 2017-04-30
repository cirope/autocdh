Sample = function (doc) {
  _.extend(this, doc)
}

Sample.prototype = {
  constructor: Sample,

  getReceipt: function () {
    return Receipts.findOne({ sampleId: this._id })
  },

  getConcrete: function () {
    return Concretes.findOne({ sampleId: this._id })
  },

  getHumidity: function () {
    return Humidities.findOne({ sampleId: this._id })
  },

  getAssay: function () {
    return Assays.findOne({ sampleId: this._id })
  },

  getCracks: function () {
    return Cracks.find({
      sampleId: this._id
    }, {
      sort: { crackIn: 1, number: 1 }
    })
  }
}

var options = {
  transform: function (doc) {
    return new Sample(doc)
  }
}

Samples = new Mongo.Collection('samples', options)

Samples.attachSchema(Schemas.Sample)

Samples.allow({
  remove: ownsDocument
})

var remove = function (collection, selector) {
  collection.find(selector).forEach(function (obj) {
    collection.remove(obj._id)
  })
}

Meteor.methods({
  createSample: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Samples.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('receiptNew', { sample_id: doc._id })
      })
  },

  updateSample: function (modifier, documentId) {
    var previousDate = Samples.findOne(documentId).date

    Samples.update(documentId, modifier)

    Meteor.call('updateCracksDate', documentId, previousDate)

    if (this.isSimulation)
      Router.go('receiptNew', { sample_id: documentId })
  },

  removeSample: function (documentId) {
    var selector = { sampleId: documentId }

    Samples.remove(documentId)

    remove(Receipts,   selector)
    remove(Concretes,  selector)
    remove(Humidities, selector)
    remove(Assays,     selector)
    remove(Cracks,     selector)
  }
})
