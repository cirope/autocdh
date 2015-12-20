Template.responsible.helpers({
  hasNoUse: function () {
    var samplesCount        = Samples.find({ responsibleId: this._id }).count()
    var cracksCount         = Cracks.find({ responsibleId: this._id }).count()
    var granulometriesCount = Granulometries.find({ responsibleId: this._id }).count()

    return samplesCount + cracksCount + granulometriesCount === 0
  }
})

Template.responsible.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeResponsible', template.data._id, function (error) {
        if (! error) Router.go('responsibleIndex')
      })
  }
})
