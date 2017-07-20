Schemas.Deviation = new SimpleSchema([Schemas.Base, {
  value: {
    type: Number,
    decimal: true,
    min: 1.10,
    max: 1.80
  }
}])

if (Meteor.isClient) {
  Schemas.Deviation.labels({
    value:          function () { return TAPi18n.__('deviation_value') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
