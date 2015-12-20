Template.settlement.helpers({
  hasNoUse: function () {
    var concretesCount = Concretes.find({ settlementId: this._id }).count()
    var formulasCount  = Formulas.find({ settlementId: this._id }).count()

    return concretesCount + formulasCount === 0
  }
})

Template.settlement.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeSettlement', template.data._id, function (error) {
        if (! error) Router.go('parameters')
      })
  }
})
