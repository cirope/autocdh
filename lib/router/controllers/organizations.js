OrganizationsController = RouteController.extend({
  data: function () {
    return { organizations: Organizations.find() }
  }
})

OrganizationController = RouteController.extend({
  data: function () {
    return Organizations.findOne(this.params._id)
  }
})
