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
    decimal: true,
    min: 1,
    max: 25,
    autoform: {
      template: 'measure',
      unit: 'cm'
    }
  },

  extended: {
    type: Boolean,
    defaultValue: false
  },

  temperature: {
    type: Number,
    decimal: true,
    min: 5,
    max: 45,
    autoform: {
      template: 'measure',
      unit: '°C'
    }
  },

  air: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.5,
    max: 40,
    autoform: {
      template: 'measure',
      unit: '%'
    }
  },

  weight: {
    type: Number,
    decimal: true,
    optional: true,
    min: 500,
    max: 4000,
    autoform: {
      template: 'measure',
      unit: 'kg/m³'
    }
  },

  hardenTime: {
    type: Date,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker',
        dateTimePickerOptions: {
          pickDate: false
        }
      }
    }
  },

  designation: {
    type: String
  },

  tubes: {
    type: Number,
    defaultValue: 3,
    allowedValues: [2, 3, 4, 16],
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: function () {
          return [
            { value: 2,  label: TAPi18n.__('assay_tubes_2') },
            { value: 3,  label: TAPi18n.__('assay_tubes_3') },
            { value: 4,  label: TAPi18n.__('assay_tubes_4') },
            { value: 16, label: TAPi18n.__('assay_tubes_16') }
          ]
        }
      }
    }
  },

  cured: {
    type: String,
    defaultValue: 'normalized',
    allowedValues: ['normalized', 'real', 'accelerated', 'alongside'],
    optional: true,
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: function () {
          return [
            { value: 'normalized',  label: TAPi18n.__('assay_cured_normalized') },
            { value: 'real',        label: TAPi18n.__('assay_cured_real') },
            { value: 'accelerated', label: TAPi18n.__('assay_cured_accelerated') },
            { value: 'alongside',   label: TAPi18n.__('assay_cured_alongside') }
          ]
        }
      }
    }
  },

  otherAssay: {
    type: String,
    allowedValues: ['density', 'water_penetration', 'capillary_absorption'],
    optional: true,
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: function () {
          return [
            { value: '',                     label: TAPi18n.__('no') },
            { value: 'density',              label: TAPi18n.__('assay_other_assay_density') },
            { value: 'water_penetration',    label: TAPi18n.__('assay_other_assay_water_penetration') },
            { value: 'capillary_absorption', label: TAPi18n.__('assay_other_assay_capillary_absorption') }
          ]
        }
      }
    }
  },

  observations: {
    type: String,
    optional: true,
    max: 65536,
    autoform: {
      afFieldInput: {
        rows: 3
      }
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Assay.labels({
    settlement:   function () { return TAPi18n.__('assay_settlement') },
    extended:     function () { return TAPi18n.__('assay_extended') },
    temperature:  function () { return TAPi18n.__('assay_temperature') },
    air:          function () { return TAPi18n.__('assay_air') },
    weight:       function () { return TAPi18n.__('assay_weight') },
    hardenTime:   function () { return TAPi18n.__('assay_harden_time') },
    designation:  function () { return TAPi18n.__('assay_designation') },
    tubes:        function () { return TAPi18n.__('assay_tubes') },
    cured:        function () { return TAPi18n.__('assay_cured') },
    otherAssay:   function () { return TAPi18n.__('assay_other_assay') },
    observations: function () { return TAPi18n.__('assay_observations') },
    userId:       function () { return TAPi18n.__('user') },
    createdAt:    function () { return TAPi18n.__('created_at') },
    updatedAt:    function () { return TAPi18n.__('updated_at') }
  })
}
