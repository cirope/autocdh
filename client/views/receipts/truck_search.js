var currentTruck = function () {
  var formId  = AutoForm.find('fields').formId
  var truckId = AutoForm.getFieldValue(formId, 'truckId')

  return truckId && Trucks.findOne(truckId)
}

Template.truckSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('truck_search_placeholder')
  },

  selectedTruckId: function () {
    var truck = currentTruck()

    return truck && truck._id
  },

  selectedTruckDriver: function () {
    var truck = currentTruck()

    return truck && truck.driver
  },

  settings: function () {
    var trucksRule = {
      collection: Trucks,
      field: 'number',
      matchAll: true,
      template: Template.truckPill,
      noMatchTemplate: Template.emptyTruckPill,
      callback: function (truck) {
        $('[name="truckId"]').val(truck && truck._id).trigger('change')
      }
    }

    return {
      limit: 10,
      rules: [trucksRule]
    }
  }
})
