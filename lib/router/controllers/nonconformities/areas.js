
AreasController = RouteController.extend({
  data: function () {
    var query = this.params.query

    return {
      hasQuery: ! _.isEmpty(query),
      areas: Areas.find(_.isEmpty(query) ? {} : castQuery(query))
    }
  }
})

AreaController = RouteController.extend({
  data: function () {
    return Areas.findOne(this.params._id)
  }
})
