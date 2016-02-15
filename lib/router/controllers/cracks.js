var dateRange = function (date) {
  var range = date.split('|')

  return {
    $gte: moment(_.first(range)).startOf('day').toDate(),
    $lte: moment(_.last(range)).endOf('day').toDate()
  }
}

var castCracksQuery = function (query) {
  var selector = {}

  if (query.designation)
    selector.designation = new RegExp('.*' + query.designation + '.*', 'gi')

  if (query.moldingTime) {
    var moldingDate = moment().subtract(+query.moldingTime, 'days').format('YYYY-MM-DD')

    selector.moldingIn = dateRange([moldingDate, moldingDate].join('|'))
  }

  if (query.moldingIn) selector.moldingIn = dateRange(query.moldingIn)
  if (query.crackIn)   selector.crackIn   = dateRange(query.crackIn)

  return selector
}

var castCrackedQuery = function (query) {
  var selector = {}

  if (query.strength) {
    var strengths = Strengths.find({ name: new RegExp('.*' + query.strength + '.*', 'gi') })
    var concretes = Concretes.find({
      strengthId: { $in: _.pluck(strengths.fetch(), '_id') }
    })

    selector.sampleId = { $in: _.pluck(concretes.fetch(), 'sampleId') }
  }

  if (query.designation)
    selector.designation = new RegExp('.*' + query.designation + '.*', 'gi')

  if (query.moldingIn) selector.moldingIn = dateRange(query.moldingIn)
  if (query.crackedIn) selector.crackedIn = dateRange(query.crackedIn)

  if (query.stress)
    selector.stress = { $lt: Math.floor(query.stress) + 1, $gte: Math.floor(query.stress) }

  return selector
}

CracksController = RouteController.extend({
  increment: 30,

  cracksLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { crackIn: 1 }, limit: this.cracksLimit() }
  },

  subscriptions: function () {
    this.cracksSub = this.subscribe('cracksLimited', { stress: null }, this.findOptions())
  },

  cracks: function (query) {
    var selector = query ? castCracksQuery(query) : {}

    return Cracks.find(_.extend(selector, { stress: null }), this.findOptions())
  },

  data: function () {
    var hasMore  = this.cracks(this.params.query).count() === this.cracksLimit()
    var nextPath = this.route.path({ limit: this.cracksLimit() + this.increment }, { query: this.params.query })

    return {
      cracks:   this.cracks(this.params.query),
      ready:    this.cracksSub.ready,
      nextPath: hasMore ? nextPath : null,
      query:    this.params.query
    }
  }
})

CracksCrackedController = RouteController.extend({
  increment: 30,

  cracksLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { crackedIn: -1 }, limit: this.cracksLimit() }
  },

  subscriptions: function () {
    this.cracksSub = this.subscribe('cracksLimited', { stress: { $ne: null } }, this.findOptions())
  },

  cracks: function (query) {
    var selector = query ? castCrackedQuery(query) : {}

    return Cracks.find(_.defaults(selector, { stress: { $ne: null } }), this.findOptions())
  },

  data: function () {
    var hasMore  = this.cracks(this.params.query).count() === this.cracksLimit()
    var nextPath = this.route.path({ limit: this.cracksLimit() + this.increment }, { query: this.params.query })

    return {
      cracks:   this.cracks(this.params.query),
      ready:    this.cracksSub.ready,
      nextPath: hasMore ? nextPath : null
    }
  }
})

CrackEditController = RouteController.extend({
  data: function () {
    var crack       = Cracks.findOne(this.params._id)
    var sibling     = Cracks.siblingOf(crack)
    var lastCracked = Cracks.findOne({ stress: { $ne: null } }, { sort: { updatedAt: -1 } })

    crack   && _.defaults(crack,   { number: 1, edit: true  })
    sibling && _.defaults(sibling, { number: 2, edit: false })

    if (crack && lastCracked && ! crack.stress)
      _.extend(crack, {
        pressId:       lastCracked.pressId,
        responsibleId: lastCracked.responsibleId
      })

    if (sibling && sibling.stress && ! crack.stress) {
      crack.crackedIn = sibling.crackedIn
      crack.number    = 2
    }

    return {
      cracks: _.sortBy(_.compact([crack, sibling]), function (c) { return c.number })
    }
  }
})

CrackController = RouteController.extend({
  data: function () {
    var crack   = Cracks.findOne(this.params._id)
    var sibling = Cracks.siblingOf(crack)

    crack   && _.defaults(crack,   { number: 1 })
    sibling && _.defaults(sibling, { number: 2 })

    return {
      cracks: _.sortBy(_.compact([crack, sibling]), function (c) { return c.number })
    }
  }
})
