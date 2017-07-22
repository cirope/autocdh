Template.area.helpers({
  hasNoUse: function () {
    var nonconformitiesCount = Nonconformities.find({ areaId: this._id }).count()

    return nonconformitiesCount === 0
  }
})

Template.area.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeArea', template.data._id, function (error) {
        if (! error) Router.go('parameters')
      })
  }
})
