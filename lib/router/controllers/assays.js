AssayNewController = RouteController.extend({
  action: function () {
    var assay = Assays.findOne({ sampleId: this.params.sample_id })

    if (assay)
      this.redirect('assayEdit', assay)
    else
      this.render('assayNew')
  },

  data: function () {
    return {
      sample: Samples.findOne(this.params.sample_id)
    }
  }
})

AssayController = RouteController.extend({
  data: function () {
    return Assays.findOne(this.params._id)
  }
})
