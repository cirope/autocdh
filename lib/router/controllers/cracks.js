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

CrackController = RouteController.extend({
  data: function () {
    var crack   = Cracks.findOne(this.params._id)
    var sibling = Cracks.siblingOf(crack)

    return {
      crack:   _.extend(crack || {}, { count: 1 }),
      sibling: sibling && _.extend(sibling, { count: 2 })
    }
  }
})
