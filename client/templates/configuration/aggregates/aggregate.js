Template.aggregate.helpers({
  hasNoUse: function () {
    var concretesCount = Concretes.find({ aggregateId: this._id }).count()
    var formulasCount  = Formulas.find({ aggregateId: this._id }).count()

    return concretesCount + formulasCount === 0
  }
})

Template.aggregate.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeAggregate', template.data._id, function (error) {
        if (! error) Router.go('parameters')
      })
  }
})
