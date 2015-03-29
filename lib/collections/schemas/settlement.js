Schemas.Settlement = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Settlements.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  lowerLimit: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 100
  },

  upperLimit: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 100
  }
}])

if (Meteor.isClient) {
  Schemas.Settlement.labels({
    name:           function () { return TAPi18n.__('settlement_name') },
    lowerLimit:     function () { return TAPi18n.__('settlement_lower_limit') },
    upperLimit:     function () { return TAPi18n.__('settlement_upper_limit') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
