Template.document.helpers({
  type: function () {
    return TAPi18n.__('document_type_' + this.type)
  }
})

Template.document.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeDocument', template.data._id, function (error) {
        if (! error) Router.go('documents', { type: template.data.type })
      })
  }
})
