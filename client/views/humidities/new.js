var _formula = function () {
  var concrete = Concretes.findOne({ sampleId: this.sample._id })

  return Formulas.findOne(
    _.pick(concrete, 'strengthId', 'settlementId', 'aggregateId', 'downloadId')
  )
}

var aggregates = function (formula) {
  var _aggregates = _.union(formula.sands, formula.gravels)

  return _aggregates.map(function (aggregate) {
    return { name: aggregate.name, amount: aggregate.amount, absorption: aggregate.absorption }
  })
}

var flowmeterCorrection = function () {
  return Settings.findOne().flowmeterCorrection || 1
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

  ratio.set(inTruck ? null : _ratio.toFixed(2))
})

Template.humidityNew.helpers({
  doc: function () {
    var formula = _formula.apply(this)

    if (formula)
      return {
        incorporated: formula.water,
        flowmeterCorrection: flowmeterCorrection(),
        aggregates: aggregates(formula)
      }
    else
      return {
        flowmeterCorrection: flowmeterCorrection(),
        aggregates: defaultAggregates()
      }
  },

  ratio: function () {

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
