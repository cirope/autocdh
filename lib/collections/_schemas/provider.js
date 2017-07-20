Schemas.Provider = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    index: true,
    max: 255,
    custom: function () {
      var other = Providers.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Provider.labels({
    name:           function () { return TAPi18n.__('provider_name') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
