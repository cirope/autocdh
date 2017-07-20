Template.work.helpers({
  hasReceipts: function () {
    return Receipts.find({ workId: this._id }).count()
  }
})

Template.work.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeWork', template.data._id, function (error) {
        if (! error) Router.go('works')
      })
  }
})
