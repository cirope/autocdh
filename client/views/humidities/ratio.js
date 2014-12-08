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
    var concrete            = sampleId && Concretes.findOne({ sampleId: sampleId }).dosages[0].amount
    var water               = AutoForm.getFieldValue(form, 'incorporated')
    var flowmeterCorrection = AutoForm.getFieldValue(form, 'flowmeterCorrection')
    var aggregatesTracker   = AutoForm.arrayTracker.getForm(form).aggregates
    var aggregatesCount     = (aggregatesTracker && aggregatesTracker.visibleCount) || 0
    var aggregatesHumidity  = 0

    aggregatesTracker && aggregatesTracker.deps.depend()

    // Start from 1, because of the water (in the index 0)
    for (var i = 1; i < aggregatesCount; i++) {
      var aggregate  = 'aggregates.' + i +  '.'

      if ($('[name^="' + aggregate + '"]').length) {
        var amount     = AutoForm.getFieldValue(form, aggregate + 'amount')
        var humidity   = AutoForm.getFieldValue(form, aggregate + 'humidity')
        var absorption = AutoForm.getFieldValue(form, aggregate + 'absorption')

        aggregatesHumidity += amount * ((humidity - absorption) / 100)
      }
    }

    var ratio = concrete && (water * flowmeterCorrection + aggregatesHumidity) / concrete

    $('[name="ratio"]').val(inTruck || ! ratio ? '' : ratio.toFixed(2))
  }
})
