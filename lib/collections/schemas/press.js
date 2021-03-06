Schemas.Press = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    custom: function () {
      var other = Presses.findOne({
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

  constant: {
    type: Object,
    autoform: {
      template: 'slim',
      cols: 3
    }
  },

  'constant.a': {
    type: Number,
    decimal: true
  },

  'constant.b': {
    type: Number,
    decimal: true
  },

  'constant.c': {
    type: Number,
    decimal: true
  }
}])

if (Meteor.isClient) {
  Schemas.Press.labels({
    name:           function () { return TAPi18n.__('press_name') },
    constant:       function () { return TAPi18n.__('press_constant') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
