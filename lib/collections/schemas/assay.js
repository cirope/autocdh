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
    custom: function () {
      var extended = this.field('extended').value
      var value    = this.value
      var min      = 1
      var max      = 25

      if (extended) {
        min = 45
        max = 80
      } else {
        min = 1
        max = 25
      }

      if (value < min)
        return 'minNumber'
      else if (value > max)
        return 'maxNumber'
    },
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
    optional: true,
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
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'LT'
    }
  },

  designation: {
    type: String
  },

  tubes: {
    type: Number,
    defaultValue: 3,
    decimal: true,
    allowedValues: [0, 1, -1, 2, -2, 2.1, -2.1, 3, -3, 3.1, 4, -4, 4.1, -4.1, 4.2, 5, -5, 5.1, -5.1, 5.2, 6, -6, 6.1, -6.1, 6.2, -6.2, 7, 16],
    autoform: {
      firstOption: false,
      options: function () {
        return [
          {
            optgroup: TAPi18n.__('assay_tubes_normal'),
            options: [
              { value: 2,    label: TAPi18n.__('assay_tubes_2') },
              { value: 3,    label: TAPi18n.__('assay_tubes_3') },
              { value: 4,    label: TAPi18n.__('assay_tubes_4') },
              { value: -4,   label: TAPi18n.__('assay_tubes_-4') },
              { value: 5,    label: TAPi18n.__('assay_tubes_5') },
              { value: -5,   label: TAPi18n.__('assay_tubes_-5') },
              { value: 16,   label: TAPi18n.__('assay_tubes_16') }
            ]
          },
          {
            optgroup: TAPi18n.__('assay_tubes_others'),
            options: [
              { value: 0,    label: TAPi18n.__('assay_tubes_0') },
              { value: 1,    label: TAPi18n.__('assay_tubes_1') },
              { value: -1,   label: TAPi18n.__('assay_tubes_-1') },
              { value: -2,   label: TAPi18n.__('assay_tubes_-2') },
              { value: 2.1,  label: TAPi18n.__('assay_tubes_2-1') },
              { value: -2.1, label: TAPi18n.__('assay_tubes_-2-1') },
              { value: -3,   label: TAPi18n.__('assay_tubes_-3') },
              { value: 3.1,  label: TAPi18n.__('assay_tubes_3-1') },
              { value: 4.1,  label: TAPi18n.__('assay_tubes_4-1') },
              { value: -4.1, label: TAPi18n.__('assay_tubes_-4-1') },
              { value: 4.2,  label: TAPi18n.__('assay_tubes_4-2') },
              { value: 5.1,  label: TAPi18n.__('assay_tubes_5-1') },
              { value: -5.1, label: TAPi18n.__('assay_tubes_-5-1') },
              { value: 5.2,  label: TAPi18n.__('assay_tubes_5-2') },
              { value: 6,    label: TAPi18n.__('assay_tubes_6') },
              { value: -6,   label: TAPi18n.__('assay_tubes_-6') },
              { value: 6.1,  label: TAPi18n.__('assay_tubes_6-1') },
              { value: 6.2,  label: TAPi18n.__('assay_tubes_6-2') },
              { value: -6.2, label: TAPi18n.__('assay_tubes_-6-2') },
              { value: -6.1, label: TAPi18n.__('assay_tubes_-6-1') },
              { value: 7,    label: TAPi18n.__('assay_tubes_7') }
            ]
          }
        ]
      }
    }
  },

  tubeType: {
    type: String,
    defaultValue: '15x30',
    allowedValues: ['15x30', '10x20', 'bending', 'other'],
    optional: true,
    autoform: {
      firstOption: false,
      options: function () {
        return [
          { value: '15x30',   label: TAPi18n.__('assay_tube_type_15x30') },
          { value: '10x20',   label: TAPi18n.__('assay_tube_type_10x20') },
          { value: 'bending', label: TAPi18n.__('assay_tube_type_bending') },
          { value: 'other',   label: TAPi18n.__('assay_tube_type_other') }
        ]
      }
    }
  },

  cured: {
    type: String,
    defaultValue: 'normalized',
    allowedValues: ['normalized', 'real', 'accelerated', 'alongside'],
    optional: true,
    autoform: {
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
  },

  otherAssay: {
    type: String,
    allowedValues: ['density', 'water_penetration', 'capillary_absorption', 'other'],
    optional: true,
    autoform: {
      firstOption: false,
      options: function () {
        return [
          { value: '',                     label: TAPi18n.__('no') },
          { value: 'density',              label: TAPi18n.__('assay_other_assay_density') },
          { value: 'water_penetration',    label: TAPi18n.__('assay_other_assay_water_penetration') },
          { value: 'capillary_absorption', label: TAPi18n.__('assay_other_assay_capillary_absorption') },
          { value: 'other',                label: TAPi18n.__('assay_other_assay_other') }
        ]
      }
    }
  },

  observations: {
    type: String,
    optional: true,
    max: 65536,
    autoform: {
      rows: 3
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Assay.labels({
    settlement:     function () { return TAPi18n.__('assay_settlement') },
    extended:       function () { return TAPi18n.__('assay_extended') },
    temperature:    function () { return TAPi18n.__('assay_temperature') },
    air:            function () { return TAPi18n.__('assay_air') },
    weight:         function () { return TAPi18n.__('assay_weight') },
    hardenTime:     function () { return TAPi18n.__('assay_harden_time') },
    designation:    function () { return TAPi18n.__('assay_designation') },
    tubes:          function () { return TAPi18n.__('assay_tubes') },
    tubeType:       function () { return TAPi18n.__('assay_tube_type') },
    cured:          function () { return TAPi18n.__('assay_cured') },
    otherAssay:     function () { return TAPi18n.__('assay_other_assay') },
    observations:   function () { return TAPi18n.__('assay_observations') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
