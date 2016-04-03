Schemas.Instrument = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Instruments.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  calibratable: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  checklist: {
    type: Number,
    allowedValues: [1, 2, 3],
    autoform: {
      firstOption: false,
      options: 'allowed'
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Instrument.labels({
    name:           function () { return TAPi18n.__('instrument_name') },
    calibratable:   function () { return TAPi18n.__('instrument_calibratable') },
    checklist:      function () { return TAPi18n.__('instrument_checklist') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
