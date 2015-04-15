var dateSelector = function (filter) {
  return {
    date: {
      $gte: filter.start.toDate(), $lte: filter.end.toDate()
    }
  }
}

Graphics = {
  filterSamples: function (filter, options) {
    var selector = dateSelector(filter)

    if (filter.strengthId  || filter.aggregateId || filter.settlementId) {
      var concretes = Concretes.find(
        _.pick(filter, 'strengthId', 'aggregateId', 'settlementId'),
        { fields: { sampleId: 1 } }
      )

      selector._id = { $in: concretes.map(function (c) { return c.sampleId }) }
    }

    return Samples.find(selector, options)
  },

  filterGranulometries: function (filter, options) {
    var selector = dateSelector(filter)

    if (filter.plantId)    selector.plantId    = filter.plantId
    if (filter.materialId) selector.materialId = filter.materialId

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
