StrengthController = RouteController.extend({
  data: function () {
    return Strengths.findOne(this.params._id)
  }
})
