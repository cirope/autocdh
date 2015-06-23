Template.press.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removePress', template.data._id, function (error) {
        if (! error) Router.go('presses')
      })
  }
})
