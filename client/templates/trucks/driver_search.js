Template.truckDriverSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('truck_driver_search_placeholder')
  },

  settings: function () {
    var trucksRule = {
      collection:      Trucks,
      field:           'driver',
      matchAll:        true,
      template:        Template.truckDriverPill,
      noMatchTemplate: Template.emptyTruckDriverPill
    }

    return {
      limit: 10,
      rules: [trucksRule]
    }
  }
})

Template.truckDriverSearch.events({
  'autocompleteselect #truck-driver-search': function (event, template, doc) {
    var $input = $(event.currentTarget);

    template.$('[name="truckDriver"]').val($input.val()).trigger('change')
  },

  'change #truck-driver-search': function (event, template) {
    var $input = $(event.currentTarget);

    template.$('[name="truckDriver"]').val($input.val()).trigger('change')
  }
})
