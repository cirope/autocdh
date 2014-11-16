Schemas.Assay = new SimpleSchema([Schemas.Base, {
  sampleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Samples.findOne(this.value)) return 'required'
    }
  },

  settlement: {
    type: Number,
    decimal: true
  },

  extended: {
    type: Boolean,
    defaultValue: false
  },

  temperature: {
    type: Number,
    decimal: true
  },

  air: {
    type: Number,
    decimal: true,
    optional: true
  },

  weight: {
    type: Number,
    decimal: true,
    optional: true
  },

  hardenTime: {
    type: Date,
    optional: true
  },

  molding: {
    type: Boolean,
    defaultValue: true
  },

  designation: {
    type: String,
    optional: true,
    custom: function () {
      var molding = this.field('molding').value

      if (molding && !this.isSet && (!this.operator || (this.value === null || this.value === '')))
        return 'required'
    }
  },

  testTubes: {
    type: Number,
    defaultValue: 3,
    allowedValues: [2, 3, 4, 16],
    optional: true,
    custom: function () {
      var molding = this.field('molding').value

      if (molding && !this.isSet && (!this.operator || (this.value === null || this.value === '')))
        return 'required'
    }
  },

  ages: {
    type: String,
    defaultValue: '7',
    allowedValues: ['7', '7-28', '28', 'full', '3-7-28'],
    optional: true,
    custom: function () {
      var molding = this.field('molding').value

      if (molding && !this.isSet && (!this.operator || (this.value === null || this.value === '')))
        return 'required'
    }
  },

  cured: {
    type: String,
    defaultValue: 'normalized',
    allowedValues: ['normalized', 'real', 'accelerated', 'alongside'],
    optional: true,
    custom: function () {
      var molding = this.field('molding').value

      if (molding && !this.isSet && (!this.operator || (this.value === null || this.value === '')))
        return 'required'
    }
  },

  otherAssay: {
    type: String,
    allowedValues: ['density', 'water_penetration', 'capillary_absorption'],
    optional: true
  },

  observations: {
    type: String,
    optional: true,
    max: 65536
  }
}])

Schemas.Assay.labels({
  settlement:            function () { return TAPi18n.__('assay_settlement') },
  extended:              function () { return TAPi18n.__('assay_extended') },
  temperature:           function () { return TAPi18n.__('assay_temperature') },
  air:                   function () { return TAPi18n.__('assay_air') },
  weight:                function () { return TAPi18n.__('assay_weight') },
  hardenTime:            function () { return TAPi18n.__('assay_harden_time') },
  molding:               function () { return TAPi18n.__('assay_molding') },
  designation:           function () { return TAPi18n.__('assay_designation') },
  testTubes:             function () { return TAPi18n.__('assay_test_tubes') },
  ages:                  function () { return TAPi18n.__('assay_ages') },
  cured:                 function () { return TAPi18n.__('assay_cured') },
  otherAssay:            function () { return TAPi18n.__('assay_other_assay') },
  observations:          function () { return TAPi18n.__('assay_observations') },
  userId:                function () { return TAPi18n.__('user') },
  createdAt:             function () { return TAPi18n.__('created_at') },
  updatedAt:             function () { return TAPi18n.__('updated_at') }
})
