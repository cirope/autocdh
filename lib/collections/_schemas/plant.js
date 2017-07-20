Schemas.Plant = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    custom: function () {
      var other = Plants.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  flowmeterCorrection: {
    type: Number,
    decimal: true,
    defaultValue: 1,
    min: 0.8,
    max: 1.2
  }
}])

if (Meteor.isClient) {
  Schemas.Plant.labels({
    name:                function () { return TAPi18n.__('plant_name') },
    flowmeterCorrection: function () { return TAPi18n.__('plant_flowmeter_correction') },
    organizationId:      function () { return TAPi18n.__('organization') },
    createdAt:           function () { return TAPi18n.__('created_at') },
    updatedAt:           function () { return TAPi18n.__('updated_at') }
  })
}
