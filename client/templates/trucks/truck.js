Template.truck.helpers({
  hasReceipts: function () {
    return Receipts.find({ truckId: this._id }).count()
  }
})

Template.truck.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeTruck', template.data._id, function (error) {
        if (! error) Router.go('trucks')
      })
  }
})
