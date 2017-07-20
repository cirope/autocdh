Schemas.Organization = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    custom: function () {
      var other = Organizations.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  imageId: {
    type: String,
    index: true,
    autoform: {
      type:       'cfs-file',
      collection: 'images'
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Organization.labels({
    name:           function () { return TAPi18n.__('organization_name') },
    imageId:        function () { return TAPi18n.__('organization_image') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
