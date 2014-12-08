var doc       = new ReactiveVar({})
var formulaId = new ReactiveVar

Tracker.autorun(function () {
  var _dosages   = []

  if (formulaId.get()) {
    var formula    = Formulas.findOne(formulaId.get())
    var aggregates = _.union(formula.sands, formula.gravels)

    _dosages.push({ name: TAPi18n.__('formula_concrete'), amount: formula.concrete, absorption: 0 })
    _dosages.push({ name: TAPi18n.__('formula_water'),    amount: formula.water,    absorption: 0 })

    aggregates.forEach(function (aggregate) {
      _dosages.push({
        name:       aggregate.name,
        amount:     aggregate.amount,
        absorption: aggregate.absorption
      })
    })
  } else {
    _dosages.push({ name: TAPi18n.__('formula_concrete'), absorption: 0 })
    _dosages.push({ name: TAPi18n.__('formula_water'),    absorption: 0 })
    _dosages.push({ name: TAPi18n.__('formula_sand') })
    _dosages.push({ name: TAPi18n.__('formula_gravel') })
  }

  doc.set({ dosages: _dosages })
})

Template._concreteNew.helpers({
  doc: function () {
    return doc.get()
  }
})

Template._concreteNew.events({
  'change [data-formula-component]': function () {
    var strengthId   = $('[name="strengthId"]').val()
    var downloadId   = $('[name="downloadId"]').val()
    var aggregateId  = $('[name="aggregateId"]').val()
    var settlementId = $('[name="settlementId"]').val()
    var _formula     = Formulas.findOne({
      strengthId:   strengthId,
      downloadId:   downloadId,
      aggregateId:  aggregateId,
      settlementId: settlementId
    })

    formulaId.set(_formula && _formula._id)
  }
})

AutoForm.addHooks('newConcreteForm', {
  before: {
    createConcrete: function (doc, template) {
      setTimeout(function () { formulaId.set(undefined) })

      return _.extend(doc, { _id: Random.id() })
    }
  }
})
