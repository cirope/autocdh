ProvidedCracksController = RouteController.extend({
  data: function () {
    return {
      providedCracks: ProvidedCracks.find()
    }
  }
})

ProvidedCrackController = RouteController.extend({
  data: function () {
    return ProvidedCracks.findOne(this.params._id)
  }
})
