Template.strength.helpers({
  hasNoUse: function () {
    var concretesCount = Concretes.find({ strengthId: this._id }).count()
    var formulasCount  = Formulas.find({ strengthId: this._id }).count()

    return concretesCount + formulasCount === 0
  }
})

Template.strength.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeStrength', template.data._id, function (error) {
        if (! error) Router.go('parameters')
      })
  }
})
