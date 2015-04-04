var events      = {
  'change [data-ratio-changer]': function (event, template) {
    updateRatio()
  }
}

var updateRatio = function () {
  var sampleId            = $('[name="sampleId"]').val()
  var inTruck             = $('[name="inTruck"]').prop('checked')
  var concrete            = sampleId && Concretes.findOne({ sampleId: sampleId })
  var concreteAmount      = concrete && concrete.concretes && concrete.concretes[0].amount
  var ice                 = +$('[name="ice"]').val()
  var water               = +$('[name="incorporated"]').val()
  var flowmeterCorrection = +$('[name="flowmeterCorrection"]').val()
  var materials           = Materials.first() || { sands: [], gravels: [] }
  var aggregatesHumidity  = 0
  var aggregateTypes      = [{
    name:      'hSands',
    materials: materials.sands
  }, {
    name:      'hGravels',
    materials: materials.gravels
  }]

  aggregateTypes.forEach(function (aggregateType) {
    $('[data-item-name^="' + aggregateType.name + '"]').each(function (i, element) {
      var amount    = $(element).find('[name$="amount"]').val()
      var humidity  = $(element).find('[name$="humidity"]').val()
      var id        = $(element).find('[name$="id"]').val()
      var aggregate = _.find(aggregateType.materials, function (aggregate) {
        return aggregate._id === id
      })

      if (aggregate)
        aggregatesHumidity += amount * ((humidity - aggregate.absorption) / 100)
    })
  })

  var ratio = concreteAmount && ((water + ice) * flowmeterCorrection + aggregatesHumidity) / concreteAmount

  if (inTruck)
    $('[name="ratio"]').val(TAPi18n.__('humidity_cannot_calculate_ratio')).prop('disabled', true)
  else
    $('[name="ratio"]').val(ratio ? ratio.toFixed(2) : '').prop('disabled', false)
}

Template._humidityNew.rendered  = updateRatio
Template._humidityEdit.rendered = updateRatio

Template._humidityNew.events(events)
Template._humidityEdit.events(events)
