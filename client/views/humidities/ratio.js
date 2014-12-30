// Water / concrete ratio
Tracker.autorun(function () {
  var currentRoute  = Router.current() && Router.current().route.getName()
  var templateForms = {
    humidityNew:  'newHumidityForm',
    humidityEdit: 'editHumidityForm'
  }

  if (templateForms[currentRoute]) {
    var form                = templateForms[currentRoute]
    var sampleId            = AutoForm.getFieldValue(form, 'sampleId')
    var inTruck             = AutoForm.getFieldValue(form, 'inTruck')
    var concrete            = sampleId && Concretes.findOne({ sampleId: sampleId }).concretes[0].amount
    var water               = AutoForm.getFieldValue(form, 'incorporated')
    var flowmeterCorrection = AutoForm.getFieldValue(form, 'flowmeterCorrection')
    var materials           = Materials.findOne() || { sands: [], gravels: [] }
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
          var amount    = AutoForm.getFieldValue(form, aggregateName + 'amount')
          var humidity  = AutoForm.getFieldValue(form, aggregateName + 'humidity')
          var id        = AutoForm.getFieldValue(form, aggregateName + 'id')
          var aggregate = _.find(aggregateType.materials, function (aggregate) {
            return aggregate._id === id
          })

          if (aggregate)
            aggregatesHumidity += amount * ((humidity - aggregate.absorption) / 100)
        }
      }
    })

    var ratio = concrete && (water * flowmeterCorrection + aggregatesHumidity) / concrete

    $('[name="ratio"]').val(inTruck || ! ratio ? '' : ratio.toFixed(2))
  }
})
