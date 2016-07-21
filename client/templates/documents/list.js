Template.documents.helpers({
  types: function () {
    var types = ['protocols', 'instructive', 'manuals', 'controls', 'fissures', 'techniques', 'others']

    return _.map(types, function (type) {
      return {
        value: type,
        label: TAPi18n.__('document_type_' + type)
      }
    })
  },

  active: function (context) {
    return context.type === this.value && 'active'
  }
})
