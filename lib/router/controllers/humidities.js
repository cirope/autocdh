HumidityNewController = RouteController.extend({
  action: function () {
    var humidity = Humidities.findOne({ sampleId: this.params.sample_id })

    if (humidity)
      this.redirect('humidityEdit', humidity)
    else
      this.render('humidityNew')
  },

  data: function () {
    var sample   = Samples.findOne(this.params.sample_id)
    var plant    = Plants.findOne(sample.plantId)
    var concrete = Concretes.findOne({ sampleId: sample._id })

    return {
      sample:              sample,
      incorporated:        concrete.water,
      flowmeterCorrection: plant.flowmeterCorrection,
      hSands:              _.clone(concrete.sands),
      hGravels:            _.clone(concrete.gravels)
    }
  }
})

HumidityController = RouteController.extend({
  data: function () {
    return Humidities.findOne(this.params._id)
  }
})
