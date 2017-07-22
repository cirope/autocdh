Template.areaNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('area_name_placeholder')
  },

  backPath: function () {
    var params = Router.current() && Router.current().params

    return params && params.nonconformity_id ?
      Router.go('nonconformityNew', { nonconformity_id: params && params.nonconformity_id }) :
      Router.go('areaNew', doc)
  },

  nonconformityId: function () {
    return Router.current() && Router.current().params.nonconformity_id
  }
})

AutoForm.addHooks('newAreaForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
