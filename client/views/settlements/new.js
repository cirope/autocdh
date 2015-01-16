Template.settlementNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('settlement_name_placeholder')
  },

  sampleId: function () {
    return Router.current() && Router.current().params.sample_id
  }
})

AutoForm.addHooks('newSettlementForm', {
  before: {
    createSettlement: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
