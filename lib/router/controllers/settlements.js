SettlementController = RouteController.extend({
  data: function () {
    return Settlements.findOne(this.params._id)
  }
})
