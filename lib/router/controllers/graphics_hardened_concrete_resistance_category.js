
var hardenedConcreteCategoryData = function () {
  var query        = _.defaults(this.params.query, {
    start: moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
    end:   moment().startOf('day').format('YYYY-MM-DD')
  })
  var filter       = Graphics.castQuery(query)
  var strength     = Strengths.findOne(filter.strengthId)
  var samples      = Graphics.filterSamples(filter).fetch()
  var sampleIds    = _.pluck(samples, '_id')
  var cracksCursor = Cracks.find({
    stress: { $ne: null }, sampleId: { $in: sampleIds }
  }, {
    sort: { sampleId: 1 }
  })
  var bySample     = {}
  var cracks       = []

  cracksCursor.forEach(function (crack) {
    var sibling = bySample[crack.sampleId]

    if (sibling) {
      var stress = Math.round((crack.stress + sibling.stress) * 100) / 200

      cracks.push(_.extend(crack, { stress:  stress }))
    } else if (_.isNumber(crack.error)) {
      bySample[crack.sampleId] = crack
    } else {
      cracks.push(crack)
    }
  })

  return {
    samples:          samples,
    cracks:           cracks,
    strength:         strength || { name:  TAPi18n.__('graphic_filter_all') },
    filter:           _.extend(filter, {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    })
  }
}

GraphicHardenedConcreteResistanceByCategoryController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(hardenedConcreteCategoryData.bind(self))
  }
})
