
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

  'change [name$=".areaId"]': function (event) {
    var area = $(event.currentTarget)

    if (area.val() === 'new') {
      area.val('')
      saveNonconformityForm()
      AutoForm.resetForm('newNonconformityForm')

      var index     = +area.prop('name').split('.')[1]
      Router.go('areaNewForNonconformity', {}, {areaIndex: index})
    }
  },

  'change [name$=".originId"]': function (event) {
    var origin = $(event.currentTarget)

    if (origin.val() === 'new') {
      origin.val('')
      saveNonconformityForm()
      AutoForm.resetForm('newNonconformityForm')

      var index     = +origin.prop('name').split('.')[1]
      Router.go('originNewForNonconformity', {}, {areaIndex: index})
    }
  },

  'change [name$=".typeId"]': function (event) {
    var nctype = $(event.currentTarget)

    if (nctype.val() === 'new') {
      nctype.val('')
      saveNonconformityForm()
      AutoForm.resetForm('newNonconformityForm')

      var index     = +nctype.prop('name').split('.')[1]
      Router.go('nctypeNewForNonconformity', {}, {areaIndex: index})
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
