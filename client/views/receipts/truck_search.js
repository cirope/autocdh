var truckDriver       = new ReactiveVar
var updateTruckDriver = function () {
  var truck = Trucks.findOne($('[name="truckId"]').val())

  truckDriver.set(truck && truck.driver)
}

Template.truckSearch.rendered = updateTruckDriver

Template.truckSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('truck_search_placeholder')
  },

  selectedTruckDriver: function () {
    return truckDriver.get()
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
  },

  'change [name="truckId"]': updateTruckDriver
})

Template.emptyTruckPill.helpers({
  showNewOnEmpty: function () {
    var routeName = Router.current() && Router.current().route.getName()

    return routeName === 'receiptNew'
  }
})
