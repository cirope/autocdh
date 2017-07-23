
var _nonconformity = new ReactiveVar
var saveNonconformityForm    = function () {
  _nonconformity.set(AutoForm.getFormValues('newNonconformityForm').insertDoc)
}


Template.nonconformityNew.onRendered(function () {
  //checkType(getField('type'));
});

Template.nonconformityNew.helpers({
  nonconformity: function () {
    if (! _nonconformity.get()) _nonconformity.set(this)

    return _nonconformity.get()
  },
})

Template.nonconformityNew.events({

  'change [name="areaId"]': function (event) {
    var area = $(event.currentTarget)

    if (area.val() === 'new') {
      area.val('')
      saveNonconformityForm()
      AutoForm.resetForm('newNonconformityForm')
      Router.go('areaNewForNonconformity')
    }
  }

})

AutoForm.addHooks('newNonconformityForm', {
  before: {
    method: function (doc) {
      if (AutoForm.validateForm('newNonconformityForm')) {
        setTimeout(function () {
          _nonconformity.set()
        }, 300)
      }

      return _.extend(doc, { _id: Random.id() })
    }
  }
})