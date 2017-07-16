var dateRange = function (date) {
  var range = date.split('|')

  return {
    $gte: moment(_.first(range)).startOf('day').toDate(),
    $lte: moment(_.last(range)).endOf('day').toDate()
  }
}

var castQuery = function (query, sampleIds, defaultSelector) {
  var selector = defaultSelector || {}
  var ids      = sampleIds || []

  if (query.receipt) {
    var receipts  = Receipts.find({ number: new RegExp('.*' + query.receipt + '.*', 'gi')})
    var sampleIds = _.pluck(receipts.fetch(), 'sampleId')

    ids = _.intersection(ids, sampleIds)
  }

  if (query.work) {
    var works     = Works.find({ name: new RegExp('.*' + query.work + '.*', 'gi') })
    var receipts  = Receipts.find({ workId: { $in: _.pluck(works.fetch(), '_id') } })
    var sampleIds = _.pluck(receipts.fetch(), 'sampleId')

    ids = _.intersection(ids, sampleIds)
  }

  if (query.molding) selector.moldingIn = dateRange(query.molding)
  if (query.cracked) selector.crackedIn = dateRange(query.cracked)

  if (query.strength) {
    var strengths = Strengths.find({ name: new RegExp('.*' + query.strength + '.*', 'gi') })
    var concretes = Concretes.find({ strengthId: { $in: _.pluck(strengths.fetch(), '_id') } })
    var sampleIds = _.pluck(concretes.fetch(), 'sampleId')

    ids = _.intersection(ids, sampleIds)
  }

  if (+query.stress) {
    var stress = Math.floor(+query.stress)

    selector.stress = { $gte: stress, $lt: stress + 1 }
  }

  selector.sampleId = { $in: ids }

  return selector
}

var hardenedConcreteCategoryData = function () {
  var query        = _.defaults(this.params.query, {
    start: moment().subtract(1, 'month').startOf('day').format('YYYY-MM-DD'),
    end:   moment().startOf('day').format('YYYY-MM-DD')
  })
  var filter       = Graphics.castQuery(query)
  var strength     = Strengths.findOne(filter.strengthId)
  var samples      = Graphics.filterSamples(filter).fetch()
  var sampleIds    = _.pluck(samples, '_id')
  var crackSelector   = castQuery(filter, sampleIds, { crackedIn: { $ne: null }, stress: { $ne: null } })
  var cracksCursor    = Cracks.find(crackSelector, { sort: { moldingIn: 1, crackedIn: -1 } })
  var bySample        = {}
  var cracks          = []


  cracksCursor.forEach(function (crack) {
    var sibling = bySample[crack.sampleId + crack.days]

    if (sibling) {
      var stress = Math.round((crack.stress + sibling.stress) * 100) / 200

      cracks.push(_.extend(crack, { stress:  stress }))
    } else if (_.isNumber(crack.error)) {
      bySample[crack.sampleId + crack.days] = crack
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
