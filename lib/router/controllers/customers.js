CustomersController = RouteController.extend({
  data: function () {
    return { customers: Customers.find({}, { sort: { name: 1 } }) }
  }
})

CustomerController = RouteController.extend({
  data: function () {
    return Customers.findOne(this.params._id)
  }
})

CustomerCracksController = RouteController.extend({
  data: function () {
    var customer      = Customers.findOne(this.params._id)
    var receipts      = customer && Receipts.find({ customerId: customer._id }, { fields: { sampleId: 1 } })
    var sampleIds     = receipts && _.pluck(receipts.fetch(), 'sampleId') || []
    var crackSelector = { sampleId: { $in: sampleIds }, crackedIn: { $ne: null }, stress: { $ne: null } }
    var cracksCursor  = Cracks.find(crackSelector, { sort: { moldingIn: 1, crackedIn: -1 } })
    var bySample      = {}
    var cracks        = []

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
      customer: customer,
      cracks:   cracks
    }
  }
})
