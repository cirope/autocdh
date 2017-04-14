var requiredOnUpdate = function () {
  if (this.isUpdate && this.isSet && ! this.value) return 'required'
}

Schemas.Crack = new SimpleSchema([Schemas.Base, {
  sampleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Samples.findOne(this.value)) return 'required'
    },
    autoform: {
      type: 'hidden'
    }
  },

  pressId: {
    type: String,
    index: true,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (this.isUpdate && ! Presses.findOne(this.value)) return 'required'
    },
    autoform: {
      firstOption: false,
      options: function () {
        var presses = Presses.find({}, { sort: { createdAt: 1 } }).map(function (press) {
          return { value: press._id, label: press.name }
        })
        var group  = presses.length ? {
          optgroup: TAPi18n.__('presses'),
          options: presses
        } :  { optgroup: ' ', options: [{ value: '', label: '' }] }

        return [
          group,
          {
            optgroup: TAPi18n.__('actions'),
            options: [
              { value: 'new', label: TAPi18n.__('press_new') },
            ]
          }
        ]
      }
    }
  },

  responsibleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Responsible.findOne(this.value)) return 'required'
    },
    autoform: {
      firstOption: false,
      options: function () {
        return Responsible.find({}, { sort: { name: 1 } }).map(function (r) {
          return { value: r._id, label: r.name }
        })
      }
    }
  },

  number: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },

  moldingIn: {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-side-by-side': true
    }
  },

  days: {
    type: Number,
    index: true
  },

  crackIn: {
    type: Date,
    index: true,
    autoform: {
      type: 'hidden'
    }
  },

  crackedIn: {
    type: Date,
    index: true,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-side-by-side': true
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
    },
    custom: requiredOnUpdate
  },

  designation: {
    type: String,
    autoform: {
      type: 'hidden'
    }
  },

  diameter: {
    type: Number,
    decimal: true,
    optional: true,
    defaultValue: 150,
    custom: function () {
      if (this.isUpdate && ! this.isSet) return 'required';

      var limits = {min: 0};
      switch(this.field('tubeType').value){
        case '15x30':
          limits = { min: 140, max: 160 };
          break;
        case '10x20':
          limits = { min: 90, max: 110 };
          break;
        case 'bending':
          limits = { min: 10, max: 500 };
          break;
      }

      if(limits.min && limits.min > this.value) return 'minNumber'
      if(limits.max && limits.max < this.value) return 'maxNumber'
    },
    autoform: {
      template: 'measure',
      unit: 'mm',
      'data-stress-modifier': true
    }
  },

  height: {
    type: Number,
    decimal: true,
    optional: true,
    defaultValue: 300,
    custom: function () {
      if (this.isUpdate && ! this.isSet) return 'required';

      var limits = {min: 0};
      switch(this.field('tubeType').value){
        case '15x30':
          limits = { min: 290, max: 310 };
          break;
        case '10x20':
          limits = { min: 190, max: 210 };
          break;
        case 'bending':
          limits = { min: 50, max: 600 };
          break;
      }

      if(limits.min && limits.min > this.value) return 'minNumber'
      if(limits.max && limits.max < this.value) return 'maxNumber'
    },
    autoform: {
      template: 'measure',
      unit: 'mm',
      'data-stress-modifier': true
    }
  },

  light: {
    type: Number,
    decimal: true,
    optional: true,
    defaultValue: 0,
    custom: function () {
      if (this.isUpdate && ! this.isSet) return 'required'

      if(this.field('tubeType').value !== 'bending'){
        this.value = 0;
      } else if (this.value < 0) {
        return 'minNumber'
      }
    },
    autoform: {
      template: 'measure',
      unit: 'mm',
      'data-stress-modifier': true
    }
  },

  load: {
    type: Number,
    decimal: true,
    optional: true,
    custom: requiredOnUpdate,
    autoform: {
      'data-stress-modifier': true
    }
  },

  stress: {
    type: Number,
    index: true,
    decimal: true,
    optional: true,
    min: 0.1,
    custom: requiredOnUpdate,
    autoform: {
      template: 'measure',
      unit: 'MPa',
      readonly: true
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
    custom: function () {
      if (this.isUpdate && this.field('otherAssay').value && ! this.value)
        return 'required'
    },
    autoform: {
      rows: 3
    }
  },

  error: {
    type: Number,
    index: true,
    decimal: true,
    optional: true
  }
}])

if (Meteor.isClient) {
  Schemas.Crack.labels({
    sampleId:       function () { return TAPi18n.__('sample') },
    pressId:        function () { return TAPi18n.__('press') },
    responsibleId:  function () { return TAPi18n.__('responsible') },
    number:         function () { return TAPi18n.__('crack_number') },
    moldingIn:      function () { return TAPi18n.__('crack_molding_in') },
    crackIn:        function () { return TAPi18n.__('crack_crack_in') },
    crackedIn:      function () { return TAPi18n.__('crack_cracked_in') },
    tubeType:       function () { return TAPi18n.__('crack_tube_type') },
    diameter:       function () { return TAPi18n.__('crack_diameter') },
    height:         function () { return TAPi18n.__('crack_height') },
    light:          function () { return TAPi18n.__('crack_light') },
    load:           function () { return TAPi18n.__('crack_load') },
    stress:         function () { return TAPi18n.__('crack_stress') },
    otherAssay:     function () { return TAPi18n.__('crack_other_assay') },
    observations:   function () { return TAPi18n.__('crack_observations') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
