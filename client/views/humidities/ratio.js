// Water / concrete ratio
Tracker.autorun(function () {
  var currentRoute  = Router.current() && Router.current().route.getName()
  var templateForms = {
    humidityNew:  'newHumidityForm',
    humidityEdit: 'editHumidityForm'
  }

  if (templateForms[currentRoute]) {
    var form                = templateForms[currentRoute]
    var sampleId            = AutoForm.getFieldValue('sampleId', form)
    var inTruck             = AutoForm.getFieldValue('inTruck', form)
    var concrete            = sampleId && Concretes.findOne({ sampleId: sampleId }).concretes[0].amount
    var ice                 = +AutoForm.getFieldValue('ice', form)
    var water               = +AutoForm.getFieldValue('incorporated', form)
    var flowmeterCorrection = +AutoForm.getFieldValue('flowmeterCorrection', form)
    var materials           = Materials.first() || { sands: [], gravels: [] }
    var aggregatesHumidity  = 0
    var hSandsTracker       = AutoForm.arrayTracker.getForm(form).hSands
    var hGravelsTracker     = AutoForm.arrayTracker.getForm(form).hGravels
    var aggregateTypes      = [{
      name:      'hSands',
      materials: materials.sands,
      tracker:   hSandsTracker,
      count:     (hSandsTracker && hSandsTracker.visibleCount) || 0
    }, {
      name:      'hGravels',
      materials: materials.gravels,
      tracker:   hGravelsTracker,
      count:     (hGravelsTracker && hGravelsTracker.visibleCount) || 0
    }]

    aggregateTypes.forEach(function (aggregateType) {
      aggregateType.tracker && aggregateType.tracker.deps.depend()

      for (var i = 0; i < aggregateType.count; i++) {
        var aggregateName  = aggregateType.name + '.' + i +  '.'

        if ($('[name^="' + aggregateName + '"]').length) {
          var amount    = AutoForm.getFieldValue(aggregateName + 'amount', form)
          var humidity  = AutoForm.getFieldValue(aggregateName + 'humidity', form)
          var id        = AutoForm.getFieldValue(aggregateName + 'id', form)
          var aggregate = _.find(aggregateType.materials, function (aggregate) {
            return aggregate._id === id
          })

          if (aggregate)
            aggregatesHumidity += amount * ((humidity - aggregate.absorption) / 100)
        }
      }
    })

    var ratio = concrete && ((water + ice) * flowmeterCorrection + aggregatesHumidity) / concrete

    if (inTruck)
      $('[name="ratio"]').val(TAPi18n.__('humidity_cannot_calculate_ratio')).prop('disabled', true)
    else
      $('[name="ratio"]').val(ratio ? ratio.toFixed(2) : '').prop('disabled', false)
  }
})
