TrucksController = RouteController.extend({
  data: function () {
    return { trucks: Trucks.find({}, { sort: { number: 1 } }) }
  }
})

TruckController = RouteController.extend({
  data: function () {
    return Trucks.findOne(this.params._id)
  }
})
