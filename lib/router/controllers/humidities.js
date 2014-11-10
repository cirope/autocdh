HumidityNewController = RouteController.extend({
  action: function () {
    var humidity = Humidities.findOne({ sampleId: this.params.sample_id })

    if (humidity)
      this.redirect('humidityEdit', humidity)
    else
      this.render('humidityNew')
  },

  data: function () {
    return {
      sample: Samples.findOne(this.params.sample_id)
    }
  }
})

HumidityController = RouteController.extend({
  data: function () {
    return Humidities.findOne(this.params._id)
  }
})
