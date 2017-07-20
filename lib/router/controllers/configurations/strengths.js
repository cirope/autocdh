StrengthsController = RouteController.extend({
  data: function () {
    return { strengths: Strengths.find() }
  }
})

StrengthController = RouteController.extend({
  data: function () {
    return Strengths.findOne(this.params._id)
  }
})
