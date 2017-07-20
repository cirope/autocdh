Template.truckNumberSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('truck_search_placeholder')
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

Template.truckNumberSearch.events({
  'autocompleteselect #truck-number-search': function (event, template, doc) {
    template.$('[name="truckId"]').val(doc && doc._id).trigger('change')
  },

  'change #truck-number-search': function (event, template) {
    if (! $(event.currentTarget).val().trim())
      template.$('[name="truckId"]').val('').trigger('change')
  }
})
