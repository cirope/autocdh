Template.originNewForNonconformity.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('origin_name_placeholder')
  }
})

AutoForm.addHooks('newOriginForNonconformityForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
