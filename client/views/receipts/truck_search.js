var truckDriver = new ReactiveVar

Template.truckSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('truck_search_placeholder')
  },

  selectedTruckDriver: function () {
    if (this.truckDriver) truckDriver.set(this.truckDriver)

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

  'change [name="truckId"]': function (event, template) {
    var truck = Trucks.findOne($('[name="truckId"]').val())
    template.data.truckDriver = null

    truckDriver.set(truck && truck.driver)
  }
})

Template.emptyTruckPill.helpers({
  showNewOnEmpty: function () {
    var routeName = Router.current() && Router.current().route.getName()

    return routeName === 'receiptNew'
  }
})
