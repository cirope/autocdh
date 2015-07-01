Schemas.Container = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Containers.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    },
    autoform: {
      autofocus: true
    }
  },

  mass: {
    type: Number,
    decimal: true,
    min: 0,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Container.labels({
    name:           function () { return TAPi18n.__('container_name') },
    mass:           function () { return TAPi18n.__('container_mass') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
