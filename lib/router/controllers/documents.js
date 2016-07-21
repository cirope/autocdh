DocumentsController = RouteController.extend({
  data: function () {
    var type = this.params.type

    return {
      type:      type,
      documents: Documents.find({ type: type })
    }
  }
})

DocumentNewController = RouteController.extend({
  data: function () {
    return {
      type: this.params.type
    }
  }
})

DocumentController = RouteController.extend({
  data: function () {
    return Documents.findOne(this.params._id)
  }
})
