Template.instrumentNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('instrument_name_placeholder')
  }
})

AutoForm.addHooks('newInstrumentForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
