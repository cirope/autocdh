HumidityNewController = RouteController.extend({
  action: function () {
    var humidity = Humidities.findOne({ sampleId: this.params.sample_id })

    if (humidity)
      this.redirect('humidityEdit', humidity)
    else
      this.render('humidityNew')
  },

  data: function () {
    var sample       = Samples.findOne(this.params.sample_id)
    var plant        = sample && Plants.findOne(sample.plantId)
    var concrete     = sample && Concretes.findOne({ sampleId: sample._id })
    var lastHumidity = Humidities.findOne({}, { sort: { createdAt: -1 } })
    var aggregates   = combinateAggregates(lastHumidity, concrete)


    return {
      sample:              sample,
      incorporated:        concrete && concrete.water,
      flowmeterCorrection: plant && plant.flowmeterCorrection,
      hSands:              aggregates.sands,
      hGravels:            aggregates.gravels
    }
  }
})

HumidityController = RouteController.extend({
  data: function () {
    return Humidities.findOne(this.params._id)
  }
})

var combinateAggregates = function (lastHumidity, concrete) {
  var aggregates = { sands: [], gravels: [] }

  if (lastHumidity && concrete) {
    concrete.sands.forEach(function (sand) {
      var hSand = _.find(lastHumidity.hSands, function (s) {
        return s.id == sand.id
      })

      aggregates.sands.push(_.extend(sand, { humidity: hSand && hSand.humidity }))
    })

    concrete.gravels.forEach(function (gravel) {
      var hGravel = _.find(lastHumidity.hGravels, function (s) {
        return s.id == gravel.id
      })

      aggregates.gravels.push(_.extend(gravel, { humidity: hGravel && hGravel.humidity }))
    })
  } else if (concrete) {
    aggregates.sands   = _.clone(concrete.sands)
    aggregates.gravels = _.clone(concrete.gravels)
  }

  return aggregates
}
