var dateRange = function (date) {
  var range = date.split('|')

  return {
    $gte: moment(_.first(range)).startOf('day').toDate(),
    $lte: moment(_.last(range)).endOf('day').toDate()
  }
}

var castQuery = function (query) {
  var selector = {}

  if (query.sampleName) selector.sampleName = new RegExp('.*' + query.sampleName + '.*', 'gi')
  if (query.origin) selector.origin = new RegExp('.*' + query.origin + '.*', 'gi')
  if (query.fieldDate) selector.fieldDate = dateRange(query.fieldDate)

  return selector
}

CompactionsController = RouteController.extend({
  increment: 30,

  compactionsLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { fieldDate: -1 }, limit: this.compactionsLimit() }
  },

  subscriptions: function () {
    this.compactionsSub = this.subscribe('compactionsLimited', this.findOptions())
  },

  compactions: function (query) {
    return Compactions.find(_.isEmpty(query) ? {} : castQuery(query), this.findOptions())
  },

  data: function () {
    var hasMore  = this.compactions(this.params.query).count() === this.compactionsLimit()
    var nextPath = this.route.path({ limit: this.compactionsLimit() + this.increment })

    return {
      compactions:  this.compactions(this.params.query),
      ready:        this.compactionsSub.ready,
      nextPath:     hasMore ? nextPath : null,
      hasQuery:     ! _.isEmpty(this.params.query)
    }
  }
})

CompactionEditController = RouteController.extend({
  data: function () {
    return Compactions.findOne(this.params._id)
  }
})

var compactionAssayData = function () {
  var series         = []
  var labels         = []

  var compaction = Compactions.findOne(this.params._id)

  /*
    while (filter.start.isBefore(filter.end)) {
      var dayEnd    = filter.start.clone().endOf('day')
      var samples   = Graphics.filterSamples(_.extend(_.clone(filter), { end: dayEnd }), { fields: { _id: 1 } })
      var sampleIds = _.pluck(samples.fetch(), '_id')
      var cracks    = Cracks.find(_.extend(_.clone(cracksSelector), { sampleId: { $in: sampleIds }}))
      var target    = strength.cusumTarget

      cracks.forEach(function (crack) {
        cusum += (crack.stress - target)
      })

      series[0].data[labels.length] = { value: cusum }

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
    }
    */

  return {
    compaction: compaction,
    labels:   labels,
    series:   series
  }
}

CompactionAssayController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(compactionAssayData.bind(self))
  }
})
