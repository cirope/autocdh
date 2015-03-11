var currentTruck = function () {
  var formId  = AutoForm.find('fields').formId
  var truckId = AutoForm.getFieldValue('truckId', formId)

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
      collection:      Trucks,
      field:           'number',
      matchAll:        true,
      template:        Template.truckPill,
      noMatchTemplate: Template.emptyTruckPill
    }

    return {
      limit: 10,
      rules: [trucksRule]
    }
  }
})

Template.truckSearch.events({
  'autocompleteselect #truck-search': function (event, template, doc) {
    $('[name="truckId"]').val(doc && doc._id).trigger('change')
  }
})

Template.emptyTruckPill.helpers({
  showNewOnEmpty: function () {
    var routeName = Router.current() && Router.current().route.getName()

    return routeName === 'receiptNew'
  }
})
