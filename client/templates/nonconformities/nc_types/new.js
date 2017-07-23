Template.areaNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('area_name_placeholder')
  }
})

AutoForm.addHooks('newAreaForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
