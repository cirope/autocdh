CracksController = RouteController.extend({
  data: function () {
    var cracks       = Cracks.find({ stress: null }, { sort: { crackIn: 1 } })
    var crackedCount = Cracks.find({ stress: { $ne: null } }).count()

    if (! cracks.count() && crackedCount)
      this.redirect('cracksCracked')
    else
      return { cracks: cracks }
  }
})

CracksCrackedController = RouteController.extend({
  data: function () {
    return {
      cracks: Cracks.find({ stress: { $ne: null } }, { sort: { crackIn: -1 } })
    }
  }
})

CrackEditController = RouteController.extend({
  data: function () {
    var crack   = Cracks.findOne(this.params._id)
    var sibling = Cracks.siblingOf(crack)

    crack   && _.defaults(crack,   { number: 1, edit: true  })
    sibling && _.defaults(sibling, { number: 2, edit: false })

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
