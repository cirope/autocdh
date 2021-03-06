Schemas.Truck = new SimpleSchema([Schemas.Base, {
  number: {
    type: String, // fucking autocomplete...
    custom: function () {
      var other = Trucks.findOne({
        number: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  driver: {
    type: String,
    max: 255,
    optional: true
  }
}])

if (Meteor.isClient) {
  Schemas.Truck.labels({
    number:         function () { return TAPi18n.__('truck_number') },
    driver:         function () { return TAPi18n.__('truck_driver') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
