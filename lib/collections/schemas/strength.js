Schemas.Strength = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Strengths.findOne({
        name: this.value,
        userId: this.userId,
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  lowResistence: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 50
  },

  highResistence: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 50
  }
}])

if (Meteor.isClient) {
  Schemas.Strength.labels({
    name:           function () { return TAPi18n.__('strength_name') },
    lowResistence:  function () { return TAPi18n.__('strength_low_resistence') },
    highResistence: function () { return TAPi18n.__('strength_high_resistence') },
    userId:         function () { return TAPi18n.__('user') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
