Template.pressNew.helpers({
  backPath: function () {
    var params = Router.current() && Router.current().params

    return params && params.crack_id ?
      Router.path('crackEdit', { _id: params.crack_id }) :
      Router.path('presses')
  }
})

AutoForm.addHooks('newPressForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
