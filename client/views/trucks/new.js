Template.truckNew.helpers({
  numberPlaceholder: function () {
    return TAPi18n.__('truck_number_placeholder')
  }
})

AutoForm.addHooks('newTruckForm', {
  before: {
    createTruck: function (doc, template) {
      doc._id = Random.id()

      return doc
    }
  }
})
