var _concrete = function () {
  return Concretes.findOne({ sampleId: this.sample._id })
}

var flowmeterCorrection = function () {
  var settings = Settings.findOne()

  return (settings && settings.flowmeterCorrection) || 1
}

var defaultAggregates = function () {
  return [
    { name: TAPi18n.__('formula_sand') },
    { name: TAPi18n.__('formula_gravel') }
  ]
}

var ratio = new ReactiveVar

Tracker.autorun(function () {
  var inTruck             = AutoForm.getFieldValue('newHumidityForm', 'inTruck')
  var incorporated        = AutoForm.getFieldValue('newHumidityForm', 'incorporated')
  var flowmeterCorrection = AutoForm.getFieldValue('newHumidityForm', 'flowmeterCorrection')

  // var aggregatesHumidity  = aggregates.reduce(function (accumulator, aggregate) {
  //   return accumulator + (aggregate.amount * (aggregate.humidity - aggregate.absorption) / 100)
  // }, 0)
  var _ratio              = incorporated * flowmeterCorrection

  ratio.set(inTruck ? '' : _ratio.toFixed(2))
})

Template.humidityNew.helpers({
  doc: function () {
    var concrete = _concrete.apply(this)

    return {
      incorporated:        _.first(concrete.dosages).amount,
      flowmeterCorrection: flowmeterCorrection(),
      aggregates:          _.rest(concrete.dosages)
    }
  },

  reactiveRatio: function () {
    return ratio.get()
  }
})

Template.humidityNew.events({
  'change [name="toggleIce"]': function (event) {
    var selected = $(event.currentTarget).is(':checked')

    if (selected)
      $('[name="ice"]').removeClass('hidden').focus()
    else
      $('[name="ice"]').addClass('hidden').val('')
  }
})

AutoForm.addHooks('newHumidityForm', {
  before: {
    createHumidity: function (doc, template) {
      doc._id = Random.id()

      return doc
    }
  }
})
