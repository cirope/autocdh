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

Template._humidityNew.helpers({
  doc: function () {
    var concrete = _concrete.apply(this)

    if (concrete)
      return {
        incorporated:        _.first(concrete.dosages).amount,
        flowmeterCorrection: flowmeterCorrection(),
        aggregates:          _.rest(concrete.dosages)
      }
  }
})

Template._humidityNew.events({
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
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
