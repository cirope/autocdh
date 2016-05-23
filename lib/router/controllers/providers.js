ProvidersController = RouteController.extend({
  data: function () {
    var selector = {}
    var query    = this.params.query

    if (query.name) selector.name = new RegExp('.*' + query.name + '.*', 'gi')

    return {
      providers: Providers.find(selector, { sort: { name: 1 } })
    }
  }
})

ProviderController = RouteController.extend({
  data: function () {
    return Providers.findOne(this.params._id)
  }
})
