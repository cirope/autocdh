ConcreteNewController = RouteController.extend({
  action: function () {
    var concrete = Concretes.findOne({ sampleId: this.params.sample_id })

    if (concrete)
      this.redirect('concreteEdit', concrete)
    else
      this.render('concreteNew')
  },

  data: function () {
    return {
      sample: Samples.findOne(this.params.sample_id)
    }
  }
})

ConcreteController = RouteController.extend({
  data: function () {
    return Concretes.findOne(this.params._id)
  }
})
