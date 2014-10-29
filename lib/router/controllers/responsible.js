ResponsibleIndexController = RouteController.extend({
  data: function () {
    return { responsible: Responsible.find() }
  }
})

ResponsibleController = RouteController.extend({
  data: function () {
    return Responsible.findOne(this.params._id)
  }
})
