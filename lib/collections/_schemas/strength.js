Schemas.Strength = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Strengths.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  resistant: {
    type: Number,
    decimal: false,
    optional: true,
    min: 0
  },

  individualCriteria: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 50
  },

  averageCriteria: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 50
  },

  cusumTarget: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0
  }
}])

if (Meteor.isClient) {
  Schemas.Strength.labels({
    name:               function () { return TAPi18n.__('strength_name') },
    resistant:          function () { return TAPi18n.__('strength_resistant') },
    individualCriteria: function () { return TAPi18n.__('strength_individual_criteria') },
    averageCriteria:    function () { return TAPi18n.__('strength_average_criteria') },
    cusumTarget:        function () { return TAPi18n.__('strength_cusum_target') },
    organizationId:     function () { return TAPi18n.__('organization') },
    createdAt:          function () { return TAPi18n.__('created_at') },
    updatedAt:          function () { return TAPi18n.__('updated_at') }
  })
}
