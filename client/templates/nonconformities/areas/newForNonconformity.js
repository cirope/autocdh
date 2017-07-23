Template.areaNewForNonconformity.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('area_name_placeholder')
  }
})

AutoForm.addHooks('newAreaForNonconformityForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
