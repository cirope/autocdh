var dosages   = new ReactiveVar([])
var formulaId = new ReactiveVar

Tracker.autorun(function () {
  var strengthId   = AutoForm.getFieldValue('newConcreteForm', 'strengthId')
  var downloadId   = AutoForm.getFieldValue('newConcreteForm', 'downloadId')
  var aggregateId  = AutoForm.getFieldValue('newConcreteForm', 'aggregateId')
  var settlementId = AutoForm.getFieldValue('newConcreteForm', 'settlementId')
  var _formula     = Formulas.findOne({
    strengthId:   strengthId,
    downloadId:   downloadId,
    aggregateId:  aggregateId,
    settlementId: settlementId
  })

  formulaId.set(_formula && _formula._id)
})

Tracker.autorun(function () {
  var _dosages   = []

  if (formulaId.get()) {
    var formula    = Formulas.findOne(formulaId.get())
    var aggregates = _.union(formula.sands, formula.gravels)

    _dosages.push({ name: TAPi18n.__('formula_concrete'), amount: formula.concrete })
    _dosages.push({ name: TAPi18n.__('formula_water'), amount: formula.water })

    aggregates.forEach(function (aggregate) {
      _dosages.push({ name: aggregate.name, amount: aggregate.amount })
    })
  } else {
    _dosages.push({ name: TAPi18n.__('formula_concrete') })
    _dosages.push({ name: TAPi18n.__('formula_water') })
    _dosages.push({ name: TAPi18n.__('formula_sand') })
    _dosages.push({ name: TAPi18n.__('formula_gravel') })
  }

  dosages.set(_dosages)
})

Template.concreteNew.helpers({
  doc: function () {
    return {
      dosages: dosages.get()
    }
  },

  strengthOptions: function () {
    return Strengths.find().map(function (strength) {
      return { value: strength._id, label: strength.name }
    })
  },

  downloadOptions: function () {
    return Downloads.find().map(function (download) {
      return { value: download._id, label: download.name }
    })
  },

  aggregateOptions: function () {
    return Aggregates.find().map(function (aggregate) {
      return { value: aggregate._id, label: aggregate.name }
    })
  },

  settlementOptions: function () {
    return Settlements.find().map(function (settlement) {
      return { value: settlement._id, label: settlement.name }
    })
  },

  typeOptions: function () {
    return Types.find().map(function (type) {
      return { value: type._id, label: type.name }
    })
  },

  additiveOptions: function () {
    return Additives.find().map(function (additive) {
      return { value: additive._id, label: additive.name }
    })
  }
})

AutoForm.addHooks('newConcreteForm', {
  before: {
    createConcrete: function (doc, template) {
      doc._id = Random.id()

      return doc
    }
  }
})
