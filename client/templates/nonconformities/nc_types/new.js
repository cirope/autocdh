Template.nctypeNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('nctype_name_placeholder')
  }
})

AutoForm.addHooks('newNcTypeForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
