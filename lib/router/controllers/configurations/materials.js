MaterialsController = RouteController.extend({
  action: function () {
    var material = Materials.first()

    if (material)
      this.redirect('material', material)
    else
      this.redirect('materialNew')
  }
})

MaterialController = RouteController.extend({
  data: function () {
    return Materials.findOne(this.params._id)
  }
})
