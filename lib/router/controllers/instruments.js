InstrumentsController = RouteController.extend({
  data: function () {
    return { instruments: Instruments.find() }
  }
})

InstrumentController = RouteController.extend({
  data: function () {
    return Instruments.findOne(this.params._id)
  }
})
