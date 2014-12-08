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
    var concrete = this.sample && Concretes.findOne({ sampleId: this.sample._id })

    if (concrete)
      return {
        incorporated:        concrete.dosages[1].amount,
        flowmeterCorrection: flowmeterCorrection(),
        aggregates:          _.rest(concrete.dosages, 2)
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
