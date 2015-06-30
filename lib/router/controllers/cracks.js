CracksController = RouteController.extend({
  increment: 10,

  cracksLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { crackIn: 1 }, limit: this.cracksLimit() }
  },

  subscriptions: function () {
    this.cracksSub = this.subscribe('cracksLimited', { stress: null }, this.findOptions())
  },

  cracks: function () {
    return Cracks.find({ stress: null }, this.findOptions())
  },

  data: function () {
    var hasMore  = this.cracks().count() === this.cracksLimit()
    var nextPath = this.route.path({ limit: this.cracksLimit() + this.increment })

    return {
      cracks:   this.cracks(),
      ready:    this.cracksSub.ready,
      nextPath: hasMore ? nextPath : null
    }
  }
})

CracksCrackedController = RouteController.extend({
  increment: 10,

  cracksLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { crackedIn: -1 }, limit: this.cracksLimit() }
  },

  subscriptions: function () {
    this.cracksSub = this.subscribe('cracksLimited', { stress: { $ne: null } }, this.findOptions())
  },

  cracks: function () {
    return Cracks.find({ stress: { $ne: null } }, this.findOptions())
  },

  data: function () {
    var hasMore  = this.cracks().count() === this.cracksLimit()
    var nextPath = this.route.path({ limit: this.cracksLimit() + this.increment })

    return {
      cracks:   this.cracks(),
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
