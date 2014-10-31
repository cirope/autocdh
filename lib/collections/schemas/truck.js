Schemas.Truck = new SimpleSchema([Schemas.Base, {
  number: {
    type: String, // fucking autocomplete...
    custom: function () {
      var other = Trucks.findOne({
        number: this.value,
        userId: this.userId,
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

Schemas.Truck.labels({
  number:    function () { return TAPi18n.__('truck_number') },
  driver:    function () { return TAPi18n.__('truck_driver') },
  userId:    function () { return TAPi18n.__('user') },
  createdAt: function () { return TAPi18n.__('created_at') },
  updatedAt: function () { return TAPi18n.__('updated_at') }
})
