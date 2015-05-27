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

  efficiencyDesirable: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.01,
    max: 50
  },

  efficiencyDesirableLow: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.01,
    max: 50
  },

  resistance7Days: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 200
  }
}])

if (Meteor.isClient) {
  Schemas.Strength.labels({
    name:                   function () { return TAPi18n.__('strength_name') },
    individualCriteria:     function () { return TAPi18n.__('strength_individual_criteria') },
    averageCriteria:        function () { return TAPi18n.__('strength_average_criteria') },
    efficiencyDesirable:    function () { return TAPi18n.__('strength_efficiency_desirable') },
    efficiencyDesirableLow: function () { return TAPi18n.__('strength_efficiency_desirable_low') },
    resistance7Days:        function () { return TAPi18n.__('strength_resistance_7_days') },
    organizationId:         function () { return TAPi18n.__('organization') },
    createdAt:              function () { return TAPi18n.__('created_at') },
    updatedAt:              function () { return TAPi18n.__('updated_at') }
  })
}
