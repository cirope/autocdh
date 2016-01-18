var dateSelector = function (filter) {
  return {
    date: {
      $gte: filter.start.startOf('day').toDate(),
      $lte: filter.end.endOf('day').toDate()
    }
  }
}

Graphics = {
  filterSamples: function (filter, options) {
    var selector        = dateSelector(filter)
    var receiptSelector = {}

    if (filter.plantId)    selector.plantId           = filter.plantId
    if (filter.workId)     receiptSelector.workId     = filter.workId
    if (filter.customerId) receiptSelector.customerId = filter.customerId

    if (filter.strengthId  || filter.aggregateId || filter.settlementId || filter.download) {
      var concretes = Concretes.find(
        _.pick(filter, 'strengthId', 'aggregateId', 'settlementId', 'download'),
        { fields: { sampleId: 1 } }
      )

      selector._id = { $in: _.pluck(concretes.fetch(), 'sampleId') }
    }

    if (_.size(receiptSelector)) {
      var receipts  = Receipts.find(receiptSelector, { fields: { sampleId: 1 } })
      var sampleIds = _.pluck(receipts.fetch(), 'sampleId')

      if (selector._id && selector._id.$in)
        selector._id.$in = _.intersection(selector._id.$in, sampleIds)
      else
        selector._id = { $in: sampleIds }
    }

    return Samples.find(selector, options)
  },

  filterGranulometries: function (filter, attribute, options) {
    var selector = dateSelector(filter)

    if (filter.plantId)    selector.plantId    = filter.plantId
    if (filter.materialId) selector.materialId = filter.materialId

    selector[attribute === 'thin' ? 'thin.percentage' : attribute] = { $ne: null }

    return Granulometries.find(selector, options)
  },

  castQuery: function (query) {
    return _.extend(_.clone(query), {
      start: moment(query.start),
      end:   moment(query.end)
    })
  },

  arrayOf: function (n, length) {
    return Array.apply(null, new Array(length)).map(Number.prototype.valueOf, n)
  }
}
