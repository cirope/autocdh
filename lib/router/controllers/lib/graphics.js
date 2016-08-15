var dateSelector = function (filter) {
  return {
    date: {
      $gte: filter.start.startOf('day').toDate(),
      $lte: filter.end.endOf('day').toDate()
    }
  }
}

var filterByAdditions = function (additions, selector, options) {
  var sampleIds = _.pluck(Samples.find(selector, options).fetch(), '_id')
  var concretes = Concretes.find({
    sampleId:       { $in: sampleIds },
    additiveAmount: { $gt: 0 }
  })
  var limit     = {
    min: additions === '5_to_10' ? 5  : 11,
    max: additions === '5_to_10' ? 10 : 20
  }
  var samples   = []

  concretes.forEach(function (concrete) {
    var concreteSum = _.reduce(concrete.concretes, function (memo, c) {
      return memo + c.amount
    }, concrete.additiveAmount)
    var percentage  = concrete.additiveAmount * 100 / concreteSum

    if (percentage >= limit.min && percentage <= limit.max)
      samples.push(concrete.sampleId)
  })

  selector._id = _.pluck(samples, '_id')
}

Graphics = {
  filterSamples: function (filter, options) {
    var selector        = dateSelector(filter)
    var receiptSelector = {}

    if (filter.molding)    selector.molding           = filter.molding
    if (filter.plantId)    selector.plantId           = filter.plantId
    if (filter.workId)     receiptSelector.workId     = filter.workId
    if (filter.truckId)    receiptSelector.truckId    = filter.truckId
    if (filter.customerId) receiptSelector.customerId = filter.customerId

    if (filter.truckDriver)
      receiptSelector.truckDriver = new RegExp('.*' + filter.truckDriver + '.*', 'gi')

    if (filter.strengthId  || filter.aggregateId || filter.settlementId || filter.additiveId || filter.download) {
      var concretes = Concretes.find(
        _.pick(filter, 'strengthId', 'aggregateId', 'settlementId', 'additiveId', 'download'),
        { fields: { sampleId: 1 } }
      )

      selector._id = { $in: _.pluck(concretes.fetch(), 'sampleId') }
    }

    if (filter.concretes && filter.concretes.length) {
      var concretes = Concretes.find({
        'concretes.id': { $all: _.pluck(filter.concretes, 'id') }
      }, {
        fields: { sampleId: 1 }
      })
      var sampleIds = _.pluck(concretes.fetch(), 'sampleId')

      if (selector._id && selector._id.$in)
        selector._id.$in = _.intersection(selector._id.$in, sampleIds)
      else
        selector._id = { $in: sampleIds }
    }

    if (_.size(receiptSelector)) {
      var receipts  = Receipts.find(receiptSelector, { fields: { sampleId: 1 } })
      var sampleIds = _.pluck(receipts.fetch(), 'sampleId')

      if (selector._id && selector._id.$in)
        selector._id.$in = _.intersection(selector._id.$in, sampleIds)
      else
        selector._id = { $in: sampleIds }
    }

    if (filter.cured) {
      var assays    = Assays.find({ cured: filter.cured }, { fields: { sampleId: 1 } })
      var sampleIds = _.pluck(assays.fetch(), 'sampleId')

      if (selector._id && selector._id.$in)
        selector._id.$in = _.intersection(selector._id.$in, sampleIds)
      else
        selector._id = { $in: sampleIds }
    }

    if (filter.additions)
      filterByAdditions(filter.additions, selector, options)

    return Samples.find(selector, options)
  },

  filterGranulometries: function (filter, attribute, options) {
    var selector = dateSelector(filter)

    if (filter.plantId)    selector.plantId    = filter.plantId
    if (filter.materialId) selector.materialId = filter.materialId
    if (filter.providerId) selector.providerId = filter.providerId

    selector[attribute === 'thin' ? 'thin.percentage' : attribute] = { $ne: null }

    return Granulometries.find(selector, options)
  },

  castQuery: function (query) {
    return _.extend(_.clone(query), {
      start: moment(query.start),
      end:   moment(query.end)
    }, query.concretes && {
      concretes: _.map(query.concretes, function (concreteId) {
        return { id: concreteId }
      })
    })
  },

  arrayOf: function (n, length) {
    var value = Math.round(n * 100) / 100

    return _.times(length, function () {
      return { value: value }
    })
  },

  mean: function (values) {
    var sum = _.reduce(values, function (memo, settlement) {
      return memo + settlement
    }, 0)

    return Math.round(sum / values.length * 10) / 10
  },

  deviation: function (values) {
    var mean          = this.mean(values)
    var deviations    = []
    var deviationsSum = 0

    _.each(values, function (settlement) {
      deviations.push(Math.pow(settlement - mean, 2))
    })

    deviationsSum = _.reduce(deviations, function (memo, d) {
      return memo + d
    }, 0)

    return Math.sqrt(deviationsSum / (values.length - 1))
  }
}
