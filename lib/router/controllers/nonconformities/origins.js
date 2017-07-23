
OriginsController = RouteController.extend({
  data: function () {
    var query = this.params.query

    return {
      hasQuery: ! _.isEmpty(query),
      origins: Origins.find(_.isEmpty(query) ? {} : castQuery(query))
    }
  }
})

OriginController = RouteController.extend({
  data: function () {
    return Origins.findOne(this.params._id)
  }
})
