Schemas.Additive = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Additives.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  unit: {
    type: String,
    allowedValues: ['l/m³', 'kg/m³'],
    autoform: {
      firstOption: false,
      options: 'allowed'
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Additive.labels({
    name:           function () { return TAPi18n.__('additive_name') },
    unit:           function () { return TAPi18n.__('additive_unit') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
