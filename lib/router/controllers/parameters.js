ParametersController = RouteController.extend({
  data: function () {
    return { strengths: Strengths.find() }
  }
})
