Schemas.Mixture = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Mixtures.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  granulometries: {
    type: [Object],
    minCount: 2,
    maxCount: 4,
    autoform: {
      template: 'slim',
      cols: 3
    }
  },

  'granulometries.$.id': {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Granulometries.findOne(this.value)) return 'required'
    }
  },

  'granulometries.$.percentage': {
    type: Number,
    decimal: true,
    min: 1,
    max: 99
  }
}])

if (Meteor.isClient) {
  Schemas.Mixture.labels({
    name:                          function () { return TAPi18n.__('mixture_name') },
    'granulometries.$.id':         function () { return TAPi18n.__('mixture_granulometry_id') },
    'granulometries.$.percentage': function () { return TAPi18n.__('mixture_granulometry_percentage') },
    organizationId:                function () { return TAPi18n.__('organization') },
    createdAt:                     function () { return TAPi18n.__('created_at') },
    updatedAt:                     function () { return TAPi18n.__('updated_at') }
  })
}
