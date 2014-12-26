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
    max: 25
  },

  extended: {
    type: Boolean,
    defaultValue: false
  },

  temperature: {
    type: Number,
    decimal: true,
    min: 5,
    max: 45
  },

  air: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.5,
    max: 40
  },

  weight: {
    type: Number,
    decimal: true,
    optional: true,
    min: 500,
    max: 4000
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
    type: String,
    optional: true
  },

  testTubes: {
    type: Number,
    defaultValue: 3,
    allowedValues: [2, 3, 4, 16],
    optional: true,
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: 'allowed'
      }
    }
  },

  ages: {
    type: String,
    defaultValue: '7-28',
    allowedValues: ['7-28', '28', 'full', '3-7-28'],
    optional: true,
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: function () {
          return [
            { value: '7-28',   label: TAPi18n.__('assay_ages_7-28') },
            { value: '28',     label: TAPi18n.__('assay_ages_28') },
            { value: 'full',   label: TAPi18n.__('assay_ages_full') },
            { value: '3-7-28', label: TAPi18n.__('assay_ages_3-7-28') }
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
