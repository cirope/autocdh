Schemas.Customer = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    index: true,
    max: 255,
    custom: function () {
      var other = Customers.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Customer.labels({
    name:           function () { return TAPi18n.__('customer_name') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
