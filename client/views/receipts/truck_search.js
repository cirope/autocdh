var selectedTruck = new ReactiveVar

Template.truckSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('truck_search_placeholder')
  },

  selectedTruck: function () {
    return selectedTruck.get()
  },

  selectedTruckId: function () {
    var truck = selectedTruck.get()

    return truck && truck._id
  },

  settings: function () {
    var trucksRule = {
      collection: Trucks,
      field: 'number',
      matchAll: true,
      template: Template.truckPill,
      noMatchTemplate: Template.emptyTruckPill,
      callback: function (truck) {
        selectedTruck.set(truck)
      }
    }

    return {
      limit: 10,
      rules: [trucksRule]
    }
  }
})

Tracker.autorun(function () {
  if (selectedTruck.get()) $('[name="truckId"]').blur()
})
