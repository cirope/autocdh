Template.truckNew.helpers({
  numberPlaceholder: function () {
    return TAPi18n.__('truck_number_placeholder')
  },

  backPath: function () {
    var params = Router.current() && Router.current().params

    return params && params.sample_id ?
      Router.path('receiptNew', { sample_id: params.sample_id }) :
      Router.path('trucks')
  }
})

AutoForm.addHooks('newTruckForm', {
  before: {
    createTruck: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
