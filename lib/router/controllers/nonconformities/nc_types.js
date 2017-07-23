
NcTypesController = RouteController.extend({
  data: function () {
    var query = this.params.query

    return {
      hasQuery: ! _.isEmpty(query),
      types: NcTypes.find(_.isEmpty(query) ? {} : castQuery(query))
    }
  }
})

NcTypeController = RouteController.extend({
  data: function () {
    return NcTypes.findOne(this.params._id)
  }
})
