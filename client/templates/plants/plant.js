Template.plant.helpers({
  hasNoUse: function () {
    var samplesCount        = Samples.find({ plantId: this._id }).count()
    var granulometriesCount = Granulometries.find({ plantId: this._id }).count()

    return samplesCount + granulometriesCount === 0
  }
})

Template.plant.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removePlant', template.data._id, function (error) {
        if (! error) Router.go('plants')
      })
  }
})
